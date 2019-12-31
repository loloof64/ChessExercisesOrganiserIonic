import { Component, ViewChild, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PlayerType } from '../../components/loloof64-chessboard/PlayerType';
import { Loloof64ChessboardComponent } from '../../components/loloof64-chessboard/loloof64-chessboard.component';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.page.html',
  styleUrls: ['./playing-page.page.scss'],
})
export class PlayingPage implements OnInit, DoCheck, AfterViewInit {

  boardSize: number;
  boardBusy = true;
  reversed = false;

  @ViewChild('chessBoard', {static: true}) chessBoard: Loloof64ChessboardComponent;

  constructor(private platform: Platform, private route: ActivatedRoute) { }

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
      this.route.paramMap.subscribe(
        {
          next: (params) => {
            const fen = params.get('fen');
            const whiteTurn = fen.split(' ')[1] === 'w';
            const whitePlayer = whiteTurn ? PlayerType.Human : PlayerType.Computer;
            const blackPlayer = whiteTurn ? PlayerType.Computer : PlayerType.Human;
            this.reversed = !whiteTurn;
            this.chessBoard.startNewGame(whitePlayer, blackPlayer, fen);
            this.boardBusy = false;
          },
          error: (err) => console.error(err),
        }
      );
    }, 2500);
  }

  hideLoader() {
    this.boardBusy = false;
  }

  showLoader() {
    this.boardBusy = true;
  }


}
