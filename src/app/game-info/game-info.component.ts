import { Component, OnInit, Input } from '@angular/core';
import { GameState } from '../game-state.interface';
import { TurnState } from '../player.enum';

@Component({
    selector: 'app-game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
    @Input() gameState: GameState;

    playerX = TurnState.XTurn;
    playerO = TurnState.OTurn;

    constructor() {}

    ngOnInit() {}
}
