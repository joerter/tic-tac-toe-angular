import { Player } from './player.enum';
import { CellState, CellStates } from './cell-state.enum';

export interface GameState {
    turn: Player;
    cellStates: CellStates;
}

export function initialGameState(): GameState {
    return {
        turn: Player.X,
        cellStates: [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ]
    };
}
