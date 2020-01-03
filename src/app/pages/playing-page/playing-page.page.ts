import { Component, ViewChild, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { PlayerType } from '../../components/loloof64-chessboard/PlayerType';
import { Loloof64ChessboardComponent } from '../../components/loloof64-chessboard/loloof64-chessboard.component';
import { Loloof64ChesshistoryComponent } from '../../components/loloof64-chesshistory/loloof64-chesshistory.component';

import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import {
  faArrowsAltV,
  faPlay,
  faStop,
  faChessBoard,
  faHistory,
  faStepBackward,
  faStepForward,
  faBackward,
  faForward,
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
  historyActive = false;

  title: string;

  faArrowsAltV = faArrowsAltV;
  faPlay = faPlay;
  faStop = faStop;
  faChessBoard = faChessBoard;
  faHistory = faHistory;
  faBackward = faBackward;
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  faForward = faForward;

  @ViewChild('chessBoard', {static: true}) chessBoard: Loloof64ChessboardComponent;
  @ViewChild('chessHistory', {static: true}) chessHistory: Loloof64ChesshistoryComponent;

  constructor(
    private platform: Platform, 
    private route: ActivatedRoute,
    private alertController: AlertController,
    private translate: TranslateService,
  ) {
    this.title = this.translate.instant('playing_page.title');
   }

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

  sendRequestBoardPosition = (moveData) => {
    this.chessBoard.requestPosition(moveData);
  }

  toggleHistoryVisibility() {
    this.historyActive = ! this.historyActive;
  }

  reverseBoard() {
    this.reversed = ! this.reversed;
  }

  processRestartGameRequest = async () => {
    if ( this.gameInProgress ) {
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
    else this.restartGame();
  }

  processStopGameRequest = async () => {
    if (! this.gameInProgress ) return;
    const alert = await this.alertController.create({
      header: 'Stop current game ?',
      message: 'Do you want to stop current game ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.boardBusy = false;
            this.chessBoard.stopCurrentGame();
            this.gameInProgress = false;
          }
        }
      ]
    });

    await alert.present();
  }

  restartGame() {
    this.chessHistory.clear();
    const whiteTurn = this.currentFen.split(' ')[1] === 'w';
    const whitePlayer = whiteTurn ? PlayerType.Human : PlayerType.Computer;
    const blackPlayer = whiteTurn ? PlayerType.Computer : PlayerType.Human;
    this.reversed = !whiteTurn;
    this.chessBoard.startNewGame(whitePlayer, blackPlayer, this.currentFen);
    this.chessHistory.setStartFen(this.currentFen);
    this.boardBusy = false;
    this.gameInProgress = true;
    this.historyActive = false;
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

  addFirstMoveNumber = ({whiteTurn, moveNumber}) => {
    this.chessHistory.addMoveNumber({whiteTurn, moveNumber});
  }

  addMoveToHistory(elt) {
    this.chessHistory.addMove(elt);
  }

  setSelectedElementInHistory(elt) {
    this.chessHistory.setSelectedElement(elt);
    this.historyActive = false;
  }

  gotoStartHistory() {
    this.chessHistory.gotoStart();
  }

  gotoPreviousHistory() {
    this.chessHistory.gotoPrevious();
  }

  gotoNextHistory() {
    this.chessHistory.gotoNext();
  }

  gotoEndHistory() {
    this.chessHistory.gotoEnd();
  }

}
