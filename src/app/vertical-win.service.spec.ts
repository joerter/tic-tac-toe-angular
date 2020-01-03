import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { VerticalWinService } from 'src/app/vertical-win.service';
import { CellState } from 'src/app/cell-state.enum';

describe('VerticalWinService', () => {
    let spectator: SpectatorService<VerticalWinService>;
    const createService = createServiceFactory(VerticalWinService);

    beforeEach(() => (spectator = createService()));

    it('should return false when is not a vertical win', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.X, CellState.X, CellState.X]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(false);
    });

    it('should return true when is vertical win in first column', () => {
        const cellStates = [
            [CellState.X, CellState.Blank, CellState.Blank],
            [CellState.X, CellState.Blank, CellState.Blank],
            [CellState.X, CellState.Blank, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });

    it('should return true when is vertical win in second column', () => {
        const cellStates = [
            [CellState.Blank, CellState.X, CellState.Blank],
            [CellState.Blank, CellState.X, CellState.Blank],
            [CellState.Blank, CellState.X, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });

    it('should return true when is vertical win in third column', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.O],
            [CellState.Blank, CellState.Blank, CellState.O],
            [CellState.Blank, CellState.Blank, CellState.O]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });
});
