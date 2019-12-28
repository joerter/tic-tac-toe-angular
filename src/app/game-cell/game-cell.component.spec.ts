import { CellState } from '../cell-state.enum';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GameCellComponent } from './game-cell.component';

describe('GameCell Component', () => {
    let spectator: Spectator<GameCellComponent>;
    const createComponent = createComponentFactory(GameCellComponent);

    let cellState = CellState.Blank;

    beforeEach(() => (spectator = createComponent()));

    it('should be blank when CellState is Blank', () => {
        cellState = CellState.Blank;
        spectator.setInput('cellState', cellState);
        spectator.detectChanges();

        expect(spectator.query('.cell-content')).toContainText('');
    });

    it('should contain an X when CellState is X', () => {
        cellState = CellState.X;
        spectator.setInput('cellState', cellState);
        spectator.detectChanges();

        expect(spectator.query('.cell-content')).toContainText('X');
    });

    it('should contain an O when CellState is O', () => {
        cellState = CellState.O;
        spectator.setInput('cellState', cellState);
        spectator.detectChanges();

        expect(spectator.query('.cell-content')).toContainText('O');
    });
});
