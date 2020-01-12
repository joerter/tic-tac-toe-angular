import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from 'src/app/app.component';
import { GameStateService } from 'src/app/game-state.service';
import { initialGameState } from 'src/app/game-state.interface';
import { TurnState } from 'src/app/turn-state.enum';
import { CellState } from 'src/app/cell-state.enum';
import {CellStatePipe} from 'src/app/cell-state.pipe';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        declarations: [CellStatePipe],
        mocks: [GameStateService]
    });

    beforeEach(() => (spectator = createComponent()));

    it('should have an initial state on ngOnInit', () => {
        spectator.detectChanges();

        expect(spectator.component.gameState).toEqual(initialGameState());
    });

    it('should update the gameState when a cell is clicked', () => {
        const expectedGameState = {
            turnState: TurnState.PlayerOTurn,
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

    it('should represet the cellstates on the board', () => {
        const expectedCells = ['', 'X', 'O', '', 'X', 'O', '', 'X', 'O'];
        const currentGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.Blank, CellState.X, CellState.O],
                [CellState.Blank, CellState.X, CellState.O],
                [CellState.Blank, CellState.X, CellState.O]
            ]
        };
        spectator.component.gameState = currentGameState;
        spectator.detectChanges();

        const actualCells = spectator.queryAll('.cell');

        actualCells.forEach((cell, index: number) => {
            expect(cell).toContainText(expectedCells[index]);
        })
    });
});
