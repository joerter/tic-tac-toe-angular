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
        setTurnStateTo(TurnState.XTurn);
        expectTurnDisplayToBe('Player X Turn');
    });

    it('should display Player O turn when turnState is TurnState.OTurn', () => {
        setTurnStateTo(TurnState.OTurn);
        expectTurnDisplayToBe('Player O Turn');
    });

    it('should display Player X wins when turnState is TurnState.XWins', () => {
        setTurnStateTo(TurnState.XWins);
        expectTurnDisplayToBe('Player X Wins');
    });

    it('should display Player O wins when turnState is TurnState.OWins', () => {
        setTurnStateTo(TurnState.OWins);
        expectTurnDisplayToBe('Player O Wins');
    });

    it('should display Tie when turnState is TurnState.Tie', () => {
        setTurnStateTo(TurnState.Tie);
        expectTurnDisplayToBe('Tie');
    });

    function setTurnStateTo(turnState: TurnState) {
        gameState.turnState = turnState;
        spectator.setInput('gameState', gameState);

        spectator.detectChanges();
    }

    function expectTurnDisplayToBe(text: string) {
        expect(spectator.query('#turn-display')).toContainText(text);
    }
});
