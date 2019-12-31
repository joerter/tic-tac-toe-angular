import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { GameStateService } from './game-state.service';
import { GameState } from './game-state.interface';
import { CellState } from './cell-state.enum';
import { Player } from './player.enum';
import { HorizontalWinService } from 'src/app/horizontal-win.service';
import { VerticalWinService } from 'src/app/vertical-win.service';
import { DiagonalWinService } from './diagonal-win.service';

describe('GameStateService', () => {
    let spectator: SpectatorService<GameStateService>;
    const createService = createServiceFactory({
        service: GameStateService,
        mocks: [HorizontalWinService, VerticalWinService, DiagonalWinService]
    });

    beforeEach(() => {
        spectator = createService();

        const horizontalWinServiceMock = spectator.get(HorizontalWinService);
        horizontalWinServiceMock.check.and.returnValue(false);

        const verticalWinServiceMock = spectator.get(VerticalWinService);
        verticalWinServiceMock.check.and.returnValue(false);

        const diagonalWinServiceMock = spectator.get(DiagonalWinService);
        diagonalWinServiceMock.check.and.returnValue(false);
    });

    it('should change CellState.Blank to CellState.X when turn is Player.X and the game has not ended', () => {
        const currentGameState: GameState = {
            turn: Player.X,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
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
            turn: Player.O,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
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
            turn: Player.O,
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
        const currentGameState: GameState = {
            turn: Player.X,
            cellStates: [
                [CellState.X, CellState.X, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };
        const horizontalWinServiceMock = spectator.get(HorizontalWinService);
        horizontalWinServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            0,
            2,
            currentGameState
        );

        expect(nextGameState.turn).toEqual(Player.XWins);
    });

    it('should change to turn to Player.OWins when Player.O clicks a cell and wins the game horizontally', () => {
        const currentGameState: GameState = {
            turn: Player.O,
            cellStates: [
                [CellState.O, CellState.O, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
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
        const currentGameState: GameState = {
            turn: Player.O,
            cellStates: [
                [CellState.O, CellState.Blank, CellState.Blank],
                [CellState.O, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
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
        const currentGameState: GameState = {
            turn: Player.X,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.X, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const diagonalWinServiceMock = spectator.get(DiagonalWinService);
        diagonalWinServiceMock.check.and.returnValue(true);

        const nextGameState = spectator.service.handleCellClick(
            2,
            2,
            currentGameState
        );

        expect(nextGameState.turn).toEqual(Player.XWins);
    });

    it('should change to turn Player.Tie when all squares are not CelLState.Blank and there is no winner', () => {
        const currentGameState: GameState = {
            turn: Player.X,
            cellStates: [
                [CellState.Blank, CellState.O, CellState.X],
                [CellState.O, CellState.X, CellState.O],
                [CellState.O, CellState.X, CellState.O]
            ]
        };

        const nextGameState = spectator.service.handleCellClick(
            0,
            0,
            currentGameState
        );

        expect(nextGameState.turn).toEqual(Player.Tie);
    });
});
