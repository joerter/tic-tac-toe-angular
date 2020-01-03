import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { DiagonalWinService } from 'src/app/diagonal-win.service';
import {CellState} from 'src/app/cell-state.enum';

describe('DiagonalWinService', () => {
    let spectator: SpectatorService<DiagonalWinService>;
    const createService = createServiceFactory(DiagonalWinService);

    beforeEach(() => (spectator = createService()));

    it('should return false when is not a diagonal win', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(false);
    });

    it('should return true when is diagonal win from left to right', () => {
        const cellStates = [
            [CellState.X, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.X, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.X],
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });

    it('should return true when is diagonal win from right to left', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.O],
            [CellState.Blank, CellState.O, CellState.Blank],
            [CellState.O, CellState.Blank, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });
});
