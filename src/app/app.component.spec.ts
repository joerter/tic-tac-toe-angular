import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { GameState, initialGameState } from './game-state.interface';
import { TurnState } from './turn-state.enum';
import { CellState } from './cell-state.enum';
import { GameStateService } from './game-state.service';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        shallow: true,
        mocks: [GameStateService]
    });

    beforeEach(() => (spectator = createComponent()));

    it('should have an initial state on ngOnInit', () => {
        spectator.detectChanges();

        expect(spectator.component.gameState).toEqual(initialGameState());
    });

    it('should update the gameState when a cell is clicked', () => {
        const expectedGameState: GameState = {
            turnState: TurnState.OTurn,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };
        const gameStateServiceMock = spectator.get(GameStateService);
        gameStateServiceMock.handleCellClick.and.returnValue(expectedGameState);

        const gameCell = spectator.query('.cell');
        spectator.click(gameCell);

        expect(spectator.component.gameState).toEqual(expectedGameState);
    });
});
