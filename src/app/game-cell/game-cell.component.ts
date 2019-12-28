import { Component, OnInit, Input } from '@angular/core';
import { CellState } from '../cell-state.enum';

@Component({
    selector: 'app-game-cell',
    templateUrl: './game-cell.component.html',
    styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent {
    @Input() cellState: CellState;

    xCellState = CellState.X;
}
