import { CellState } from '../cell-state.enum';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GameCellComponent } from './game-cell.component';

describe('GameCell Component', () => {
    let spectator: Spectator<GameCellComponent>;
    const createComponent = createComponentFactory(GameCellComponent);

    beforeEach(() => (spectator = createComponent()));

    it('should be blank when CellState is Blank', () => {
        expect(spectator.query('.cell')).toContainText('');
    });

    it('should contain an X when CellState is X', () => {
        const cellState = CellState.X;
        spectator.setInput('cellState', cellState);
        spectator.detectChanges();

        expect(spectator.query('.cell')).toContainText('X');
    });
});
