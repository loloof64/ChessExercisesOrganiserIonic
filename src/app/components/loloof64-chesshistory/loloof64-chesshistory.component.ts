import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ChessMove } from '../loloof64-chessboard/loloof64-chessboard.component';

@Component({
  selector: 'loloof64-chesshistory',
  templateUrl: './loloof64-chesshistory.component.html',
  styleUrls: ['./loloof64-chesshistory.component.scss'],
})
export class Loloof64ChesshistoryComponent implements OnInit {

  @Input() height = 200.0;
  @Input() width = 200.0;

  @Output() public requestBoardFen: EventEmitter<string> = new EventEmitter<string>();
  @Output() public requestBoardLastMove: EventEmitter<ChessMove> = new EventEmitter<ChessMove>();

  firstMove = false;
  elements = [];

  constructor(private changeDetector: ChangeDetectorRef,) { }

  ngOnInit() {}

  addMove = ({moveFan, whiteTurn, moveNumber, fen, lastMove}) => {
    if (whiteTurn && !this.firstMove) this.addMoveNumber({whiteTurn, moveNumber});
    this.elements.push({
      text: moveFan,
      fen,
      lastMove,
    });
    this.firstMove = false;
    this.changeDetector.detectChanges();
  }

  addMoveNumber = ({whiteTurn, moveNumber}) => {
    const text = `${moveNumber}.${whiteTurn ? '' : '..'}`;
    this.elements.push({
      text
    });
  }

  clear = () => {
    this.elements = [];
    this.firstMove = true;
  }

  sendRequestSetBoardMove = (elt) => {
    if (elt.fen) {
      this.requestBoardFen.emit(elt.fen);
    }
    if (elt.lastMove) {
      this.requestBoardLastMove.emit(elt.lastMove);
    }
  }

}
