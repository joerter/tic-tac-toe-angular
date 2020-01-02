import { Injectable } from '@angular/core';
import { CellStates } from './cell-state.enum';

@Injectable({
    providedIn: 'root'
})
export class DiagonalWinService {
    constructor() {}

    check(cellStates: CellStates) {
        return false;
    }
}
