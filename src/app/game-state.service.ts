import { Injectable } from '@angular/core';
import { GameState } from './game-state.interface';
import { CellState, CellStates } from './cell-state.enum';
import { TurnState } from './turn-state.enum';
import { HorizontalWinService } from 'src/app/horizontal-win.service';
import { VerticalWinService } from 'src/app/vertical-win.service';
import { DiagonalWinService } from 'src/app/diagonal-win.service';
import { TieService } from 'src/app/tie.service';

@Injectable({
    providedIn: 'root'
})
export class GameStateService {
    constructor(
        private horizontalWinService: HorizontalWinService,
        private verticalWinService: VerticalWinService,
        private diagonalWinService: DiagonalWinService,
        private tieService: TieService
    ) {}

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

        const cellStates = this.mapCellStates(
            cellRow,
            cellColumn,
            currentGameState.cellStates,
            currentGameState.turnState
        );
        const turnState = this.calculateTurnState(
            cellStates,
            currentGameState.turnState
        );

        return {
            turnState,
            cellStates
        };
    }

    private calculateTurnState(cellStates: CellStates, turn: TurnState) {
        const isXTurn = turn === TurnState.XTurn;

        const winningPlayer = isXTurn ? TurnState.XWins : TurnState.OWins;
        const nextTurnState = isXTurn ? TurnState.OTurn : TurnState.XTurn;

        if (this.isWinningMove(cellStates, turn)) {
            return winningPlayer;
        }

        if (this.tieService.check(cellStates)) {
            return TurnState.Tie;
        }

        return nextTurnState;
    }

    private isWinningMove(cellStates: CellState[][], turn: TurnState) {
        return (
            this.horizontalWinService.check(cellStates, turn) ||
            this.verticalWinService.check(cellStates, turn) ||
            this.diagonalWinService.check(cellStates, turn)
        );
    }

    private mapCellStates(
        cellRow: number,
        cellColumn: number,
        currentCellStates: CellStates,
        playerTurn: TurnState
    ) {
        return currentCellStates.map((rowState, rowIndex) => {
            if (rowIndex !== cellRow) {
                return rowState;
            }

            return rowState.map((columnState, columnIndex) => {
                if (columnIndex !== cellColumn) {
                    return columnState;
                }

                return playerTurn === TurnState.XTurn
                    ? CellState.X
                    : CellState.O;
            });
        });
    }
}
