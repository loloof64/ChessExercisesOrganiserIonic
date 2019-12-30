import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PlayerType } from '../loloof64-chessboard/PlayerType';
import { Loloof64ChessboardComponent } from '../loloof64-chessboard/loloof64-chessboard.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements AfterViewInit {

  @ViewChild('chessBoard', {static: true}) chessBoard: Loloof64ChessboardComponent;

  ngAfterViewInit() {
    this.chessBoard.startNewGame(PlayerType.Human, PlayerType.Human, undefined);
  }

}
