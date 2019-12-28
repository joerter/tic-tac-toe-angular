import { Player } from './player.enum';
import { CellState } from './cell-state.enum';

export interface GameState {
    turn: Player;
    cellStates: CellState[][];
}
