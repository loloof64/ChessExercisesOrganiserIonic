import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MoveData } from '../loloof64-chessboard/loloof64-chessboard.component';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

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
  startFen = undefined;
  startPositionElement = undefined;

  constructor(private changeDetector: ChangeDetectorRef,) { }

  ngOnInit() {}

  setStartFen = (fen) => {
    this.startFen = fen;
    this.startPositionElement = {
      fen: this.startFen,
      lastMove: undefined,
      moveFan: undefined,
      moveNumber: undefined,
      text: undefined,
      whiteTurn: undefined,
    };
  }

  addMove = (elt) => {
    if (elt.whiteTurn && !this.firstMove) this.addMoveNumber(elt);
    this.elements.push(elt);
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

  gotoStart() {
    this.selectedElement = undefined;
    this.requestBoardPosition.emit(this.startPositionElement);
  }

  gotoPrevious() {
    const currentElementIndex = this.elements.findIndex(item => item === this.selectedElement);
    const movesElements = this.elements.filter(item => item.lastMove !== undefined);
    const currentMoveIndex = movesElements.findIndex(item => item === this.selectedElement);
    const currentElementNotFound = currentElementIndex < 0;

    if (currentElementNotFound) return;
    if (currentMoveIndex < 0) return;

    var newSelectedElement;

    if (currentMoveIndex == 0) {
      newSelectedElement = this.startPositionElement;
    }
    else {
      newSelectedElement = movesElements[currentMoveIndex - 1];
    }
    
    this.requestBoardPosition.emit(newSelectedElement);
  }

  gotoNext() {
    const currentElementIndex = this.elements.findIndex(item => item === this.selectedElement);
    const movesElements = this.elements.filter(item => item.lastMove !== undefined);
    const currentMoveIndex = movesElements.findIndex(item => item === this.selectedElement);
    const currentElementNotFound = currentElementIndex < 0;

    var newSelectedElement;
    if (currentElementNotFound) {
      if (this.selectedElement === this.startPositionElement) {
        newSelectedElement = movesElements[0];
      }
      else return;
    }
    else  {
      if (currentMoveIndex >= movesElements.length - 1) return;
      newSelectedElement = movesElements[currentMoveIndex + 1];
    }
    this.requestBoardPosition.emit(newSelectedElement);
  }

  gotoEnd() {
    const movesElements = this.elements.filter(item => item.lastMove !== undefined);
    
    const newSelectedElement = movesElements[movesElements.length - 1];
    this.requestBoardPosition.emit(newSelectedElement);
  }

}
