import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { GameState, initialGameState } from './game-state.interface';
import { Player } from './player.enum';
import { CellState } from './cell-state.enum';
import { GameCellComponent } from './game-cell/game-cell.component';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        shallow: true
    });

    beforeEach(() => (spectator = createComponent()));

    it('should have an initial state on ngOnInit', () => {
        spectator.detectChanges();

        expect(spectator.component.gameState).toEqual(initialGameState());
    });

    it('should update the turn to Player O and CellState to X when a blank cell is clicked and turn is Player X', () => {
        const gameCell = spectator.query('.cell');
        spectator.click(gameCell);

        const expectedGameState: GameState = {
            turn: Player.O,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        expect(spectator.component.gameState).toEqual(expectedGameState);
    });

    it('should update the turn to Player X and CellState to O when a blank cell is clicked and turn is Player O', () => {
        spectator.component.gameState.turn = Player.O;
        const gameCell = spectator.query('.cell');
        spectator.click(gameCell);

        const expectedGameState: GameState = {
            turn: Player.X,
            cellStates: [
                [CellState.O, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        expect(spectator.component.gameState).toEqual(expectedGameState);
    });
});
