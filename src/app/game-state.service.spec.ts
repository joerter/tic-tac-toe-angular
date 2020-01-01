import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GameStateService } from './game-state.service';
import { GameState, initialGameState } from './game-state.interface';
import { CellState } from './cell-state.enum';
import { Player } from './player.enum';
import { HorizontalWinService } from 'src/app/horizontal-win.service';
import { VerticalWinService } from 'src/app/vertical-win.service';
import { DiagonalWinService } from './diagonal-win.service';
import { TieService } from 'src/app/tie.service';

describe('GameStateService', () => {
    let spectator: SpectatorService<GameStateService>;
    const createService = createServiceFactory({
        service: GameStateService,
        mocks: [
            HorizontalWinService,
            VerticalWinService,
            DiagonalWinService,
            TieService
        ]
    });

    beforeEach(() => {
        spectator = createService();

        const horizontalWinServiceMock = spectator.get(HorizontalWinService);
        horizontalWinServiceMock.check.and.returnValue(false);

        const verticalWinServiceMock = spectator.get(VerticalWinService);
        verticalWinServiceMock.check.and.returnValue(false);

        const diagonalWinServiceMock = spectator.get(DiagonalWinService);
        diagonalWinServiceMock.check.and.returnValue(false);

        const tieServiceMock = spectator.get(TieService);
        tieServiceMock.check.and.returnValue(false);
    });

    it('should change CellState.Blank to CellState.X when turn is Player.X and the game has not ended', () => {
        const currentGameState: GameState = {
            ...initialGameState(),
            turn: Player.X
        };
        const expectedCellStates = [
            [CellState.X, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ];

        const nextGameState = spectator.service.handleCellClick(
            0,
            0,
            currentGameState
        );

        expect(nextGameState.cellStates).toEqual(expectedCellStates);
    });

    it('should change CellState.Blank to CellState.O when turn is Player.O and the game has not ended', () => {
        const currentGameState: GameState = {
            ...initialGameState(),
            turn: Player.O
        };
        const expectedCellStates = [
            [CellState.Blank, CellState.O, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ];

        const nextGameState = spectator.service.handleCellClick(
            0,
            1,
            currentGameState
        );

        expect(nextGameState.cellStates).toEqual(expectedCellStates);
    });

    it('should return the current game state when a cell that is not CellState.Blank is clicked', () => {
        const currentGameState: GameState = {
            ...initialGameState(),
            cellStates: [
                [CellState.X, CellState.O, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        let nextGameState = spectator.service.handleCellClick(
            0,
            0,
            currentGameState
        );
        expect(nextGameState.cellStates).toEqual(currentGameState.cellStates);

        nextGameState = spectator.service.handleCellClick(
            0,
            1,
            currentGameState
        );
        expect(nextGameState.cellStates).toEqual(currentGameState.cellStates);
    });

    it('should change to turn to Player.XWins when Player.X clicks a cell and wins the game horizontally', () => {
        const horizontalWinServiceMock = spectator.get(HorizontalWinService);
        horizontalWinServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            0,
            2,
            initialGameState()
        );

        expect(nextGameState.turn).toEqual(Player.XWins);
    });

    it('should change to turn to Player.OWins when Player.O clicks a cell and wins the game horizontally', () => {
        const currentGameState = {
            ...initialGameState(),
            turn: Player.O
        };
        const horizontalWinServiceMock = spectator.get(HorizontalWinService);
        horizontalWinServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            0,
            2,
            currentGameState
        );

        expect(nextGameState.turn).toEqual(Player.OWins);
    });

    it('should change to turn Player.OWins when Player.O clicks a cell and wins the game vertically', () => {
        const currentGameState = {
            ...initialGameState(),
            turn: Player.O
        };
        const verticalWinServiceMock = spectator.get(VerticalWinService);
        verticalWinServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            2,
            0,
            currentGameState
        );

        expect(nextGameState.turn).toEqual(Player.OWins);
    });

    it('should change to turn Player.XWins when Player.X clicks a cell and wins the game diagonally', () => {
        const diagonalWinServiceMock = spectator.get(DiagonalWinService);
        diagonalWinServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            2,
            2,
            initialGameState()
        );

        expect(nextGameState.turn).toEqual(Player.XWins);
    });

    it('should change to turn Player.Tie when all squares are not CelLState.Blank and there is no winner', () => {
        const tieServiceMock = spectator.get(TieService);
        tieServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            0,
            0,
            initialGameState()
        );

        expect(nextGameState.turn).toEqual(Player.Tie);
    });
});
