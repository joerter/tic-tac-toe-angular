import { Component, OnInit, Input } from '@angular/core';
import { GameState } from '../game-state.interface';
import { Player } from '../player.enum';

@Component({
    selector: 'app-game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit {
    @Input() gameState: GameState;

    playerX = Player.X;
    playerO = Player.O;

    constructor() {}

    ngOnInit() {}
}
