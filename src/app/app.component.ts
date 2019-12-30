import { Component } from '@angular/core';
import { initialGameState } from './game-state.interface';
import { Player } from './player.enum';
import { CellStates, CellState } from './cell-state.enum';
import { GameStateService } from './game-state.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private gameStateService: GameStateService) {}

    gameState = initialGameState();

    handleCellClick(cellRow: number, cellColumn: number) {
        this.gameState = this.gameStateService.handleCellClick(cellRow, cellColumn);
    }
}
