import { Component, ViewChild, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PlayerType } from '../loloof64-chessboard/PlayerType';
import { Loloof64ChessboardComponent } from '../loloof64-chessboard/loloof64-chessboard.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements  OnInit, DoCheck, AfterViewInit {

  @ViewChild('chessBoard', {static: true}) chessBoard: Loloof64ChessboardComponent;

  boardSize: number;
  boardBusy = true;

  constructor(private platform: Platform) {}

  private adjustBoardSize = () => {
    this.boardSize = this.platform.isPortrait() ?
      this.platform.width() :
      this.platform.height() - 56;
  }

  ngOnInit() {
    this.adjustBoardSize();
  }

  ngDoCheck() {
    this.adjustBoardSize();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.boardBusy = false;
      this.chessBoard.startNewGame(PlayerType.Computer, PlayerType.Human, undefined);
    }, 2500);
  }

  hideLoader() {
    this.boardBusy = false;
  }

  showLoader() {
    this.boardBusy = true;
  }


}
