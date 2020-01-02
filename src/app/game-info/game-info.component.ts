import { Component, Input } from '@angular/core';
import { GameState } from '../game-state.interface';
import { TurnState } from '../turn-state.enum';

@Component({
    selector: 'app-game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent {
    @Input() gameState: GameState;

    playerX = TurnState.XTurn;
    playerO = TurnState.OTurn;
}
