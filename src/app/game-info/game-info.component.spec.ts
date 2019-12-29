import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GameInfoComponent } from './game-info.component';
import { GameState, initialGameState } from '../game-state.interface';
import { Player } from '../player.enum';

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
        gameState.turn = Player.X;
        spectator.setInput('gameState', gameState);
        spectator.detectChanges();

        expect(spectator.query('#turn-display')).toContainText('Player X Turn');
    });

    it('should display Player O turn when state is Player.O', () => {
        gameState.turn = Player.O;
        spectator.setInput('gameState', gameState);
        spectator.detectChanges();

        expect(spectator.query('#turn-display')).toContainText('Player O Turn');
    });
});
