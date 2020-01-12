import { Pipe, PipeTransform } from '@angular/core';
import {CellState} from 'src/app/cell-state.enum';

@Pipe({
    name: 'cellState'
})
export class CellStatePipe implements PipeTransform {
    transform(cellState: CellState) {
        switch (cellState) {
            case CellState.X:
                return 'X';
            case CellState.O:
                return 'O';
            default:
                return '';
        }
    }
}
