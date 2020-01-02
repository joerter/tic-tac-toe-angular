import { TurnState } from './turn-state.enum';
import { CellState, CellStates } from './cell-state.enum';

export interface GameState {
    turnState: TurnState;
    cellStates: CellStates;
}

export function initialGameState(): GameState {
    return {
        turnState: TurnState.XTurn,
        cellStates: [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ]
    };
}
