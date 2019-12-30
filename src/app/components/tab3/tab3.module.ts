import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Loloof64ChessboardComponent } from '../loloof64-chessboard/loloof64-chessboard.component';
import { Loloof64ChessboardCellComponent } from '../loloof64-chessboard/loloof64-chessboard-cell/loloof64-chessboard-cell.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page, Loloof64ChessboardComponent, Loloof64ChessboardCellComponent]
})
export class Tab3PageModule {}
