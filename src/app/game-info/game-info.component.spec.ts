import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GameInfoComponent } from './game-info.component';
import { GameState, initialGameState } from '../game-state.interface';
import { TurnState } from '../player.enum';

describe('GameInfoComponent', () => {
    let spectator: Spectator<GameInfoComponent>;
    const createComponent = createComponentFactory(GameInfoComponent);

    let gameState: GameState;

    beforeEach(() => {
        gameState = initialGameState(),
        spectator = createComponent({
            props: {
                gameState
            }
        });
    });

    it('should display Player X turn when state is Player.X', () => {
        gameState.turnState = TurnState.XTurn;
        spectator.setInput('gameState', gameState);
        spectator.detectChanges();

        expect(spectator.query('#turn-display')).toContainText('Player X Turn');
    });

    it('should display Player O turn when state is Player.O', () => {
        gameState.turnState = TurnState.OTurn;
        spectator.setInput('gameState', gameState);
        spectator.detectChanges();

        expect(spectator.query('#turn-display')).toContainText('Player O Turn');
    });
});
