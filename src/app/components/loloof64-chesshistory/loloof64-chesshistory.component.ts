import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'loloof64-chesshistory',
  templateUrl: './loloof64-chesshistory.component.html',
  styleUrls: ['./loloof64-chesshistory.component.scss'],
})
export class Loloof64ChesshistoryComponent implements OnInit {

  @Input() height = 200.0;
  @Input() width = 200.0;

  @Output() public requestBoardFen: EventEmitter<string> = new EventEmitter<string>();

  firstMove = false;
  elements = [];

  constructor(private changeDetector: ChangeDetectorRef,) { }

  ngOnInit() {}

  addMove = ({moveFan, whiteTurn, moveNumber, fen}) => {
    if (whiteTurn && !this.firstMove) this.addMoveNumber({whiteTurn, moveNumber});
    this.elements.push({
      text: moveFan,
      fen,
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

  sendRequestSetBoardFen = (elt) => {
    if (elt.fen) this.requestBoardFen.emit(elt.fen);
  }

}
