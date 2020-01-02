import { Injectable } from '@angular/core';
import { CellStates } from 'src/app/cell-state.enum';

@Injectable({
    providedIn: 'root'
})
export class VerticalWinService {
    constructor() {}

    check(cellStates: CellStates) {
        return false;
    }
}
