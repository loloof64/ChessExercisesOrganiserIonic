import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MoveData } from '../loloof64-chessboard/loloof64-chessboard.component';

@Component({
  selector: 'loloof64-chesshistory',
  templateUrl: './loloof64-chesshistory.component.html',
  styleUrls: ['./loloof64-chesshistory.component.scss'],
})
export class Loloof64ChesshistoryComponent implements OnInit {

  @Input() height = 200.0;
  @Input() width = 200.0;

  @Output() public requestBoardPosition: EventEmitter<MoveData> = new EventEmitter<MoveData>();

  firstMove = false;
  elements = [];
  selectedElement = undefined;

  constructor(private changeDetector: ChangeDetectorRef,) { }

  ngOnInit() {}

  addMove = (elt) => {
    if (elt.whiteTurn && !this.firstMove) this.addMoveNumber(elt);
    this.elements.push({
      ...elt,
      text: elt.moveFan,
    });
    this.firstMove = false;
    this.changeDetector.detectChanges();
  }

  addMoveNumber = (elt) => {
    const text = `${elt.moveNumber}.${elt.whiteTurn ? '' : '..'}`;
    this.elements.push({
      text
    });
  }

  clear = () => {
    this.elements = [];
    this.firstMove = true;
    this.selectedElement = undefined;
  }

  sendRequestSetBoardMove = (elt) => {
    if (elt.fen && elt.lastMove) {
      this.requestBoardPosition.emit(elt);
    }
  }

  setSelectedElement = (elt) => {
    this.selectedElement = elt;
  }

}
