import { Injectable } from '@angular/core';
import { GameState } from './game-state.interface';
import { CellState, CellStates } from './cell-state.enum';
import { Player } from './player.enum';
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
            currentGameState.turn
        );
        const turn = this.calculateTurn(cellStates, currentGameState.turn);

        return {
            turn,
            cellStates
        };
    }

    private calculateTurn(cellStates: CellStates, turn: Player) {
        const isXTurn = turn === Player.X;

        const winningPlayer = isXTurn ? Player.XWins : Player.OWins;
        const nextTurn = isXTurn ? Player.O : Player.X;

        if (
            this.horizontalWinService.check(cellStates, turn) ||
            this.verticalWinService.check(cellStates, turn) ||
            this.diagonalWinService.check(cellStates, turn)
        ) {
            return winningPlayer;
        }

        if (this.tieService.check(cellStates)) {
            return Player.Tie;
        }

        return nextTurn;
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

                return playerTurn === Player.X ? CellState.X : CellState.O;
            });
        });
    }
}
