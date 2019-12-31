import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayingPageRoutingModule } from './playing-page-routing.module';

import { PlayingPage } from './playing-page.page';

import { Loloof64ChessboardComponent } from '../../components/loloof64-chessboard/loloof64-chessboard.component';
import { Loloof64ChessboardCellComponent } from '../../components/loloof64-chessboard/loloof64-chessboard-cell/loloof64-chessboard-cell.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayingPageRoutingModule
  ],
  declarations: [PlayingPage, Loloof64ChessboardCellComponent, Loloof64ChessboardComponent]
})
export class PlayingPageModule {}
