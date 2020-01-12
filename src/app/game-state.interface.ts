import { TurnState } from './turn-state.enum';
import { CellStates } from './cell-states.type';
import { CellState } from 'src/app/cell-state.enum';

export interface GameState {
    turnState: TurnState;
    cellStates: CellStates;
}

export function initialGameState(): GameState {
    return {
        turnState: TurnState.PlayerXTurn,
        cellStates: [
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank],
            [CellState.Blank, CellState.Blank, CellState.Blank]
        ]
    };
}
