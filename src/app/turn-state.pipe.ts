import { Pipe, PipeTransform } from '@angular/core';
import { TurnState } from './turn-state.enum';

@Pipe({
  name: 'turnState'
})
export class TurnStatePipe implements PipeTransform {

    transform(turnState: TurnState){
        switch (turnState) {
            case TurnState.PlayerXTurn:
                return 'Player X Turn';
            case TurnState.PlayerOTurn:
                return 'Player O Turn';
            case TurnState.PlayerXWins:
                return 'Player X Wins!';
            case TurnState.PlayerOWins:
                return 'Player O Wins!';
            case TurnState.Tie:
                return 'Tie!';
            default:
                return '';
        }
    }
}
