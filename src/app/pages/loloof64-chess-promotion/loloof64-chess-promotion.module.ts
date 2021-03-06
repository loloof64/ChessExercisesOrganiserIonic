import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Loloof64ChessPromotionPage } from './loloof64-chess-promotion.page';

const routes: Routes = [
  {
    path: '',
    component: Loloof64ChessPromotionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [Loloof64ChessPromotionPage],
  exports: [Loloof64ChessPromotionPage],
  declarations: [Loloof64ChessPromotionPage],
})
export class Loloof64ChessPromotionPageModule {}
