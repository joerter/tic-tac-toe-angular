import { Injectable } from '@angular/core';
import { CellStates } from 'src/app/cell-states.type';
import { CellState } from 'src/app/cell-state.enum';

@Injectable({
    providedIn: 'root'
})
export class VerticalWinService {
    constructor() {}

    check(cellStates: CellStates) {
        for (let columnIndex = 0; columnIndex <= 2; columnIndex++) {
            if (
                cellStates[0][columnIndex] !== CellState.Blank &&
                cellStates[0][columnIndex] === cellStates[1][columnIndex] &&
                cellStates[0][columnIndex] === cellStates[2][columnIndex]
            ) {
                return true;
            }
        }

        return false;
    }
}
