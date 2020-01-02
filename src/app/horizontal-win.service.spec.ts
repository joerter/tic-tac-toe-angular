import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { HorizontalWinService } from 'src/app/horizontal-win.service';
import { CellState } from 'src/app/cell-state.enum';
import { TurnState } from 'src/app/turn-state.enum';

describe('HorizontalWinService', () => {
    let spectator: SpectatorService<HorizontalWinService>;
    const createService = createServiceFactory(HorizontalWinService);

    beforeEach(() => (spectator = createService()));

    it('should return false when is not a horizontal win', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(false);
    });

    it('should return true when is top row win', () => {
        const cellStates = [
            [CellState.X, CellState.X, CellState.X],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });

    it('should return true when is middle row win', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.O, CellState.O, CellState.O],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });

    it('should return true when is bottom row win', () => {
        const cellStates = [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.O, CellState.O, CellState.O]
        ];

        const result = spectator.service.check(cellStates);

        expect(result).toEqual(true);
    });
});
