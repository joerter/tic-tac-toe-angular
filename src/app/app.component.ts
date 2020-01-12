import { Component } from '@angular/core';
import { GameStateService } from 'src/app/game-state.service';
import { GameState, initialGameState } from 'src/app/game-state.interface';
import {CellState} from 'src/app/cell-state.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private gameStateService: GameStateService) {}

    gameState: GameState = initialGameState();

    handleCellClick(row: number, column: number) {
        this.gameState = this.gameStateService.handleCellClick(
            row,
            column,
            this.gameState
        );
    }
}
