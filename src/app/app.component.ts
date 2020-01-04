import { Component } from '@angular/core';
import { initialGameState } from './game-state.interface';
import { GameStateService } from './game-state.service';
import { TurnState } from 'src/app/turn-state.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private gameStateService: GameStateService) {}

    gameState = initialGameState();

    get gameHasEnded() {
        return (
            this.gameState.turnState === TurnState.OWins ||
            this.gameState.turnState === TurnState.XWins ||
            this.gameState.turnState === TurnState.Tie
        );
    }

    handleCellClick(cellRow: number, cellColumn: number) {
        if (this.gameHasEnded) {
            return;
        }

        this.gameState = this.gameStateService.handleCellClick(
            cellRow,
            cellColumn,
            this.gameState
        );
    }

    resetGameState() {
        this.gameState = initialGameState();
    }
}
