import { Injectable } from '@angular/core';
import { CellStates } from './cell-states.type';
import {CellState} from 'src/app/cell-state.enum';

@Injectable({
  providedIn: 'root'
})
export class TieService {

  constructor() { }

  check(cellStates: CellStates) {
      for (let row = 0; row <= 2; row++) {
          for (let column = 0; column <= 2; column++) {
              if (cellStates[row][column] === CellState.Blank) {
                  return false;
              }
          }
      }

      return true;
  }
}
