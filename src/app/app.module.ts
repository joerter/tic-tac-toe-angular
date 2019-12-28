import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { GameCellComponent } from './game-cell/game-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    GameInfoComponent,
    GameCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
