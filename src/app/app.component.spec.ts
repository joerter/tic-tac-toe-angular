import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from 'src/app/app.component';
import { GameStateService } from 'src/app/game-state.service';
import { initialGameState } from 'src/app/game-state.interface';
import { TurnState } from 'src/app/turn-state.enum';
import { CellState } from 'src/app/cell-state.enum';
import { CellStatePipe } from 'src/app/cell-state.pipe';
import { TurnStatePipe } from 'src/app/turn-state.pipe';
import { GameHasEndedPipe } from 'src/app/game-has-ended.pipe';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;
    const createComponent = createComponentFactory({
        component: AppComponent,
        declarations: [CellStatePipe, TurnStatePipe, GameHasEndedPipe],
        mocks: [GameStateService]
    });

    beforeEach(() => (spectator = createComponent()));

    function expectTurnStateToContain(text: string) {
        expect(spectator.query('.turn-state')).toContainText(text);
    }

    it('should have an initial state on ngOnInit', () => {
        spectator.detectChanges();

        expect(spectator.component.gameState).toEqual(initialGameState());
    });

    it('should update the gameState when a cell is clicked', () => {
        const expectedGameState = {
            turnState: TurnState.PlayerOTurn,
            cellStates: [
                [CellState.X, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank],
                [CellState.Blank, CellState.Blank, CellState.Blank]
            ]
        };

        const gameStateServiceMock = spectator.get(GameStateService);
        gameStateServiceMock.handleCellClick.and.returnValue(expectedGameState);

        const gameCell = spectator.query('.cell');
        spectator.click(gameCell);

        expect(spectator.component.gameState).toEqual(expectedGameState);
    });

    it('should represet the cellstates on the board', () => {
        const expectedCells = ['', 'X', 'O', '', 'X', 'O', '', 'X', 'O'];
        const currentGameState = {
            turnState: TurnState.PlayerXTurn,
            cellStates: [
                [CellState.Blank, CellState.X, CellState.O],
                [CellState.Blank, CellState.X, CellState.O],
                [CellState.Blank, CellState.X, CellState.O]
            ]
        };
        spectator.component.gameState = currentGameState;
        spectator.detectChanges();

        const actualCells = spectator.queryAll('.cell');

        actualCells.forEach((cell, index: number) => {
            expect(cell).toContainText(expectedCells[index]);
        });
    });

    it('should display "Player X Turn" when TurnState is PlayerXTurn', () => {
        spectator.component.gameState = {
            ...initialGameState(),
            turnState: TurnState.PlayerXTurn
        };
        spectator.detectChanges();

        expectTurnStateToContain('Player X Turn');
        expect(spectator.query('#reset-button')).not.toExist();
    });

    it('should display "Player O Turn" when TurnState is PlayerOTurn', () => {
        spectator.component.gameState = {
            ...initialGameState(),
            turnState: TurnState.PlayerOTurn
        };
        spectator.detectChanges();

        expectTurnStateToContain('Player O Turn');
        expect(spectator.query('#reset-button')).not.toExist();
    });

    it('should display "Player X Wins!", make the reset button appear, and hide the board when TurnState is PlayerXWins', () => {
        spectator.component.gameState = {
            ...initialGameState(),
            turnState: TurnState.PlayerXWins
        };
        spectator.detectChanges();

        expectTurnStateToContain('Player X Wins!');
        expect(spectator.query('#reset-button')).toExist();
        expect(spectator.query('.board')).toHaveClass('hidden');
    });

    it('should display "Player O Wins!", make the reset button appear, and hide the board when TurnState is PlayerOWins', () => {
        spectator.component.gameState = {
            ...initialGameState(),
            turnState: TurnState.PlayerOWins
        };
        spectator.detectChanges();

        expectTurnStateToContain('Player O Wins!');
        expect(spectator.query('#reset-button')).toExist();
        expect(spectator.query('.board')).toHaveClass('hidden');
    });

    it('should display "Tie!", make the reset button appear, and hide the board when TurnState is Tie', () => {
        spectator.component.gameState = {
            ...initialGameState(),
            turnState: TurnState.Tie
        };
        spectator.detectChanges();

        expectTurnStateToContain('Tie!');
        expect(spectator.query('#reset-button')).toExist();
        expect(spectator.query('.board')).toHaveClass('hidden');
    });

    it('should reset the gameState when the reset button is clicked', () => {
        spectator.component.gameState = {
            ...initialGameState(),
            turnState: TurnState.PlayerOWins
        };
        spectator.detectChanges();

        spectator.click('#reset-button');

        expect(spectator.component.gameState).toEqual(initialGameState());
    })
});
