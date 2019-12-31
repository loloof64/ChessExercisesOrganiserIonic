import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayingPageRoutingModule } from './playing-page-routing.module';

import { PlayingPage } from './playing-page.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Loloof64ChessboardComponent } from '../../components/loloof64-chessboard/loloof64-chessboard.component';
import { Loloof64ChessboardCellComponent } from '../../components/loloof64-chessboard/loloof64-chessboard-cell/loloof64-chessboard-cell.component';
import { Loloof64ChesshistoryComponent } from '../../components/loloof64-chesshistory/loloof64-chesshistory.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayingPageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [
    PlayingPage, 
    Loloof64ChessboardCellComponent, 
    Loloof64ChessboardComponent,
    Loloof64ChesshistoryComponent,
  ]
})
export class PlayingPageModule {}
