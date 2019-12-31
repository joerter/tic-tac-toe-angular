import { Injectable } from '@angular/core';
import { CellStates } from './cell-state.enum';
import { Player } from './player.enum';

@Injectable({
    providedIn: 'root'
})
export class DiagonalWinService {
    constructor() {}

    check(cellStates: CellStates, turn: Player) {
        return false;
    }
}
