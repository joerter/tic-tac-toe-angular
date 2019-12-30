import { Injectable } from '@angular/core';
import { GameState } from './game-state.interface';
import { CellState, CellStates } from './cell-state.enum';
import { Player } from './player.enum';

@Injectable({
    providedIn: 'root'
})
export class GameStateService {
    constructor() {}

    handleCellClick(
        cellRow: number,
        cellColumn: number,
        currentGameState: GameState
    ): GameState {
        const currentCellState =
            currentGameState.cellStates[cellRow][cellColumn];
        if (currentCellState !== CellState.Blank) {
            return currentGameState;
        }

        const cellStates = this.mapCellStates(cellRow, cellColumn, currentGameState.cellStates, currentGameState.turn);
        const turn = this.calculateTurn(cellStates, currentGameState.turn);

        return {
            turn,
            cellStates
        };
    }

    private calculateTurn(cellStates: CellStates, turn: Player) {
        let playerCellCount = 0;
        const isPlayerXTurn = turn === Player.X;
        const isPlayerOTurn = turn === Player.O;

        cellStates.forEach(row => {
            row.forEach(cellState => {
                if (isPlayerXTurn && cellState === CellState.X || isPlayerOTurn && cellState === CellState.O) {
                    playerCellCount++;
                }
            });
        });

        if (playerCellCount === 3) {
            return isPlayerXTurn ? Player.XWins : Player.OWins;
        }

        return isPlayerXTurn ? Player.O : Player.X;
    }

    private mapCellStates(
        cellRow: number,
        cellColumn: number,
        currentCellStates: CellStates,
        playerTurn: Player
    ) {
        return currentCellStates.map((rowState, rowIndex) => {
            if (rowIndex !== cellRow) {
                return rowState;
            }

            return rowState.map((columnState, columnIndex) => {
                if (columnIndex !== cellColumn) {
                    return columnState;
                }

                return playerTurn === Player.X
                    ? CellState.X
                    : CellState.O;
            });
        });
    }
}
