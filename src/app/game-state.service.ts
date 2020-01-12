import { Injectable } from '@angular/core';
import { GameState } from 'src/app/game-state.interface';
import { CellState } from 'src/app/cell-state.enum';
import { TurnState } from 'src/app/turn-state.enum';
import { HorizontalWinService } from 'src/app/horizontal-win.service';
import { CellStates } from 'src/app/cell-states.type';
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
        row: number,
        column: number,
        currentGameState: GameState
    ): GameState {
        if (currentGameState.cellStates[row][column] !== CellState.Blank) {
            return currentGameState;
        }

        const cellStates = this.mapCellStates(row, column, currentGameState);
        const turnState = this.calculateTurnState(
            currentGameState.turnState,
            cellStates
        );

        return {
            turnState,
            cellStates
        };
    }

    private calculateTurnState(
        currentTurnState: TurnState,
        newCellStates: CellStates
    ) {
        const winningPlayer =
            currentTurnState === TurnState.PlayerXTurn
                ? TurnState.PlayerXWins
                : TurnState.PlayerOWins;

        const nextPlayer =
            currentTurnState === TurnState.PlayerXTurn
                ? TurnState.PlayerOTurn
                : TurnState.PlayerXTurn;

        if (this.isWin(newCellStates)) {
            return winningPlayer;
        }

        if (this.tieService.check(newCellStates)) {
            return TurnState.Tie;
        }

        return nextPlayer;
    }

    private mapCellStates(
        row: number,
        column: number,
        currentGameState: GameState
    ) {
        return currentGameState.cellStates.map((rowState, rowIndex) => {
            if (rowIndex !== row) {
                return rowState;
            }

            return rowState.map((columnState, columnIndex) => {
                if (columnIndex !== column) {
                    return columnState;
                }

                return currentGameState.turnState === TurnState.PlayerXTurn
                    ? CellState.X
                    : CellState.O;
            });
        });
    }

    private isWin(newCellStates: CellState[][]) {
        return (
            this.horizontalWinService.check(newCellStates) ||
            this.verticalWinService.check(newCellStates) ||
            this.diagonalWinService.check(newCellStates)
        );
    }
}
