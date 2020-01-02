import { Injectable } from '@angular/core';
import { CellStates } from 'src/app/cell-state.enum';
import { TurnState } from 'src/app/player.enum';

@Injectable({
    providedIn: 'root'
})
export class HorizontalWinService {
    check(cellStates: CellStates, turn: TurnState) {
        return false;
    }
}
