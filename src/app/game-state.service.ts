import { Injectable } from '@angular/core';
import { GameState } from './game-state.interface';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  constructor() { }

  handleCellClick(cellRow: number, cellColumn: number): GameState {
      return null;
  }
}
