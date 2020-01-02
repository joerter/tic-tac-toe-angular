import { Injectable } from '@angular/core';
import { CellStates } from 'src/app/cell-state.enum';

@Injectable({
    providedIn: 'root'
})
export class HorizontalWinService {
    check(cellStates: CellStates) {
        for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
            if (
                (cellStates[rowIndex][0] === cellStates[rowIndex][1]) ===
                cellStates[rowIndex][2]
            ) {
                return true;
            }
        }

        return false;
    }
}
