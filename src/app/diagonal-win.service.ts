import { Injectable } from '@angular/core';
import { CellStates } from './cell-state.enum';
import { TurnState } from './player.enum';

@Injectable({
    providedIn: 'root'
})
export class DiagonalWinService {
    constructor() {}

    check(cellStates: CellStates, turn: TurnState) {
        return false;
    }
}
