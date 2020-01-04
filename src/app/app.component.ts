import { Component } from '@angular/core';
import { initialGameState } from './game-state.interface';
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
        console.log(`clicked cell (${cellRow}, ${cellColumn})`);
        const gameState = this.gameStateService.handleCellClick(
            cellRow,
            cellColumn,
            this.gameState
        );
        console.log('new gameState: ', gameState);
        this.gameState = gameState;
    }
}
