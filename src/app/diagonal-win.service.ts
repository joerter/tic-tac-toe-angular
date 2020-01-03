import { Injectable } from '@angular/core';
import { CellStates, CellState } from './cell-state.enum';

@Injectable({
    providedIn: 'root'
})
export class DiagonalWinService {
    constructor() {}

    check(cellStates: CellStates) {
        const leftToRight =
            cellStates[0][0] !== CellState.Blank &&
            cellStates[0][0] === cellStates[1][1] &&
            cellStates[0][0] === cellStates[2][2];

        const rightToLeft =
            cellStates[0][2] !== CellState.Blank &&
            cellStates[0][2] === cellStates[1][1] &&
            cellStates[0][2] === cellStates[2][0];

        return leftToRight || rightToLeft;
    }
}
