import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GameInfoComponent } from './game-info.component';
import { GameState, initialGameState } from '../game-state.interface';
import { TurnState } from '../turn-state.enum';

describe('GameInfoComponent', () => {
    let spectator: Spectator<GameInfoComponent>;
    const createComponent = createComponentFactory(GameInfoComponent);

    let gameState: GameState;

    beforeEach(() => {
        (gameState = initialGameState()),
            (spectator = createComponent({
                props: {
                    gameState
                }
            }));
    });

    it('should display Player X turn when turnState is TurnState.XTurn', () => {
        gameState.turnState = TurnState.XTurn;
        spectator.setInput('gameState', gameState);
        spectator.detectChanges();

        expect(spectator.query('#turn-display')).toContainText('Player X Turn');
    });

    it('should display Player O turn when turnState is TurnState.OTurn', () => {
        gameState.turnState = TurnState.OTurn;
        spectator.setInput('gameState', gameState);
        spectator.detectChanges();

        expect(spectator.query('#turn-display')).toContainText('Player O Turn');
    });
});
