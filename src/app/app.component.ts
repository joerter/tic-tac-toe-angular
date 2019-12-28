import { Component } from '@angular/core';
import { GameState } from './game-state.interface';
import { Player } from './player.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    gameState: GameState = {
        turn: Player.X
    };
}
