import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { GameState } from './game-state.interface';
import { Player } from './player.enum';
import { CellState } from './cell-state.enum';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        shallow: true
    });

    beforeEach(() => (spectator = createComponent()));

    it('should have an initial state on ngOnInit', () => {
        spectator.detectChanges();

        const expectedInitialGameState: GameState = {
            turn: Player.X,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        expect(spectator.component.gameState).toEqual(expectedInitialGameState);
    });
});
