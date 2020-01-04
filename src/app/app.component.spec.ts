import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { GameState, initialGameState } from './game-state.interface';
import { TurnState } from './turn-state.enum';
import { CellState } from './cell-state.enum';
import { GameStateService } from './game-state.service';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        shallow: true,
        mocks: [GameStateService]
    });

    beforeEach(() => (spectator = createComponent()));

    it('should have an initial state on ngOnInit', () => {
        spectator.detectChanges();

        expect(spectator.component.gameState).toEqual(initialGameState());
    });

    describe('handleCellClick', () => {
        it('should update the gameState', () => {
            const expectedGameState: GameState = {
                turnState: TurnState.OTurn,
                cellStates: [
                    [CellState.X, CellState.Blank, CellState.Blank],
                    [CellState.Blank, CellState.Blank, CellState.Blank],
                    [CellState.Blank, CellState.Blank, CellState.Blank]
                ]
            };
            setupGameStateServiceMock(spectator, expectedGameState);

            const gameCell = spectator.query('.cell');
            spectator.click(gameCell);

            expect(spectator.component.gameState).toEqual(expectedGameState);
        });

        it('should not update the gameState when turnState is XWins', () => {
            setTurnState(spectator, TurnState.XWins);

            const gameStateServiceMock = setupGameStateServiceMock(
                spectator,
                initialGameState()
            );
            spectator.click('.cell');

            expect(gameStateServiceMock.handleCellClick.calls.count()).toEqual(
                0
            );
        });
    });

    describe('reset button', () => {
        it('should display when the turnState is XWins', () => {
            setTurnState(spectator, TurnState.XWins);

            expectResetButtonToExist(spectator);
        });

        it('should display when the turnState is OWins', () => {
            setTurnState(spectator, TurnState.OWins);

            expectResetButtonToExist(spectator);
        });

        it('should display when the turnState is Tie', () => {
            setTurnState(spectator, TurnState.Tie);

            expectResetButtonToExist(spectator);
        });

        it('should not display when the game has not ended', () => {
            setTurnState(spectator, TurnState.OTurn);

            expect(spectator.query('button#reset')).not.toExist();
        });

        it('should reset the gameState when clicked', () => {
            setTurnState(spectator, TurnState.XWins);
            spectator.detectChanges();

            spectator.click('button#reset');

            expect(spectator.component.gameState).toEqual(initialGameState());
        });
    });
});

function setupGameStateServiceMock(
    spectator: Spectator<AppComponent>,
    gameState: GameState
) {
    const gameStateServiceMock = spectator.get(GameStateService);
    gameStateServiceMock.handleCellClick.and.returnValue(gameState);
    return gameStateServiceMock;
}

function expectResetButtonToExist(spectator: Spectator<AppComponent>) {
    expect(spectator.query('button#reset')).toExist();
}

function setTurnState(
    spectator: Spectator<AppComponent>,
    turnState: TurnState
) {
    spectator.component.gameState = {
        ...initialGameState(),
        turnState
    };
    spectator.detectChanges();
}
