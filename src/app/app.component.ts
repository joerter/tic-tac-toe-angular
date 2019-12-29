import { Component } from '@angular/core';
import { initialGameState } from './game-state.interface';
import { Player } from './player.enum';
import { CellStates, CellState } from './cell-state.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    gameState = initialGameState();

    handleCellClick(cellRow: number, cellColumn: number) {
        this.gameState = {
            ...this.gameState,
            turn: this.gameState.turn === Player.X ? Player.O : Player.X,
            cellStates: this.mapCellStates(cellRow, cellColumn)
        };
    }

    private mapCellStates(cellRow: number, cellColumn: number) {
        return this.gameState.cellStates.map((rowState, rowIndex) => {
            if (rowIndex !== cellRow) {
                return rowState;
            }

            return rowState.map((cellState, cellIndex) => {
                if (cellIndex !== cellColumn) {
                    return cellState;
                }

                return this.gameState.turn === Player.X
                    ? CellState.X
                    : CellState.O;
            });
        });
    }
}
