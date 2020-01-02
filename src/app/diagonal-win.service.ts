import { Injectable } from '@angular/core';
import { CellStates } from './cell-state.enum';
import { TurnState } from './turn-state.enum';

@Injectable({
    providedIn: 'root'
})
export class DiagonalWinService {
    constructor() {}

    check(cellStates: CellStates, turn: TurnState) {
        return false;
    }
}
