import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CellStatePipe } from './cell-state.pipe';
import { TurnStatePipe } from 'src/app/turn-state.pipe';
import { GameHasEndedPipe } from './game-has-ended.pipe';

@NgModule({
    declarations: [AppComponent, CellStatePipe, TurnStatePipe, GameHasEndedPipe],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
