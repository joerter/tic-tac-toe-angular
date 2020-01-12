import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { GameStateService } from 'src/app/game-state.service';
import { CellState } from 'src/app/cell-state.enum';
import { TurnState } from 'src/app/turn-state.enum';
import { GameState } from 'src/app/game-state.interface';

describe('GameState Service', () => {
    let spectator: SpectatorService<GameStateService>;
    const createService = createServiceFactory({
        service: GameStateService,
        mocks: []
    });

    beforeEach(() => (spectator = createService()));

    it('should change to TurnState.PlayerOTurn and CellState.Blank to CellState.X when turn state is XTurn and the game has not ended', () => {
        const currentGameState: GameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };
        const expectedGameState: GameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const actualGameState = spectator.service.handleCellClick(
            0,
            0,
            currentGameState
        );

        expect(actualGameState).toEqual(expectedGameState);
    });

    it('should change to TurnState.PlayerXTurn and CellState.Blank to CellState.O when turn is TurnState.PlayerOTurn and the game has not ended', () => {
        const currentGameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const expectedGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.O, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const actualGameState = spectator.service.handleCellClick(
            0,
            0,
            currentGameState
        );

        expect(actualGameState).toEqual(expectedGameState);
    });

    it('should return the current game state when a cell that is not CellState.Blank is clicked', () => {
        const currentGameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const actualGameState = spectator.service.handleCellClick(
            0,
            0,
            currentGameState
        );

        expect(actualGameState).toEqual(currentGameState);
    });

    it('should change to TurnState.PlayerXWins when X clicks a cell and wins the game horizontally', () => {
        const currentGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.X, CellState.X, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };
        const nextGameState = spectator.service.handleCellClick(
            0,
            2,
            currentGameState
        );

        expect(nextGameState.turnState).toEqual(TurnState.PlayerXWins);
    });

    it('should change to turn to PlayerOWins when O click on a cell and win the game horizontally', () => {
        const currentGameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.O, CellState.O, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };
        const nextGameState = spectator.service.handleCellClick(
            0,
            2,
            currentGameState
        );

        expect(nextGameState.turnState).toEqual(TurnState.PlayerOWins);
    });

    it('should change to turn PlayerXWins when X clicks on a cell and wins the game vertically', () => {
        const currentGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.X],
                [CellState.Blank, CellState.Blank, CellState.X],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const nextGameState = spectator.service.handleCellClick(
            2,
            2,
            currentGameState
        );

        expect(nextGameState.turnState).toEqual(TurnState.PlayerXWins);
    });

    it('should change to turn PlayerOWins when O clicks on a cell and wins the game vertically', () => {
        const currentGameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.Blank, CellState.Blank, CellState.O],
                [CellState.Blank, CellState.Blank, CellState.O],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const nextGameState = spectator.service.handleCellClick(
            2,
            2,
            currentGameState
        );

        expect(nextGameState.turnState).toEqual(TurnState.PlayerOWins);
    });

    it('should change to turn PlayerXWins when X clicks a cell and wins the game diagonally', () => {
        const currentGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.X, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const nextGameState = spectator.service.handleCellClick(
            2,
            2,
            currentGameState
        );

        expect(nextGameState.turnState).toEqual(TurnState.PlayerXWins);
    });

    it('should change to PlayerOWins when O clicks a cell and wins the game diagonally', () => {
        const currentGameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.O, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.O, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const nextGameState = spectator.service.handleCellClick(2, 2, currentGameState);

        expect(nextGameState.turnState).toEqual(TurnState.PlayerOWins);
    });

    it('should change to Tie when the game ends and no one has won', () => {
        const currentGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.O, CellState.Blank, CellState.O],
                [CellState.X, CellState.O, CellState.X],
                [CellState.X, CellState.O, CellState.X],
            ]
        };

        const nextGameState = spectator.service.handleCellClick(0, 1, currentGameState);

        expect(nextGameState.turnState).toEqual(TurnState.Tie);
    });
});
