import { Pipe, PipeTransform } from '@angular/core';
import { TurnState } from './turn-state.enum';

@Pipe({
    name: 'gameHasEnded'
})
export class GameHasEndedPipe implements PipeTransform {
    transform(turnState: TurnState) {
    return turnState === TurnState.Tie ||
            turnState === TurnState.PlayerXWins ||
            turnState === TurnState.PlayerOWins
    }
}
