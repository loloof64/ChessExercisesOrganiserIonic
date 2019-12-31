import { Component, ViewChild, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { PlayerType } from '../../components/loloof64-chessboard/PlayerType';
import { Loloof64ChessboardComponent } from '../../components/loloof64-chessboard/loloof64-chessboard.component';

import { ActivatedRoute } from '@angular/router';

import {
  faArrowsAltV,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.page.html',
  styleUrls: ['./playing-page.page.scss'],
})
export class PlayingPage implements OnInit, DoCheck, AfterViewInit {

  boardSize: number;
  boardBusy = true;
  reversed = false;
  currentFen = undefined;
  gameInProgress = false;

  faArrowsAltV = faArrowsAltV;
  faPlay = faPlay;
  faStop = faStop;

  @ViewChild('chessBoard', {static: true}) chessBoard: Loloof64ChessboardComponent;

  constructor(
    private platform: Platform, 
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) { }

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
            this.currentFen = fen;
            this.restartGame();
          },
          error: (err) => console.error(err),
        }
      );
    }, 2500);
  }

  reverseBoard() {
    this.reversed = ! this.reversed;
  }

  processRestartGameRequest = async () => {
    const alert = await this.alertController.create({
      header: 'Quit current game ?',
      message: 'Do you want to quit current game and start a new one ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.restartGame();
          }
        }
      ]
    });

    await alert.present();
  }

  restartGame() {
    const whiteTurn = this.currentFen.split(' ')[1] === 'w';
    const whitePlayer = whiteTurn ? PlayerType.Human : PlayerType.Computer;
    const blackPlayer = whiteTurn ? PlayerType.Computer : PlayerType.Human;
    this.reversed = !whiteTurn;
    this.chessBoard.startNewGame(whitePlayer, blackPlayer, this.currentFen);
    this.boardBusy = false;
    this.gameInProgress = true;
  }

  hideLoader() {
    this.boardBusy = false;
  }

  showLoader() {
    this.boardBusy = true;
  }

  updateGameFinished() {
    this.gameInProgress = false;
  }


}
