import { Component, AfterViewChecked, Input, Renderer2, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'loloof64-chessboard-cell',
  templateUrl: './loloof64-chessboard-cell.component.html',
  styleUrls: ['./loloof64-chessboard-cell.component.scss'],
})
export class Loloof64ChessboardCellComponent implements AfterViewChecked, OnChanges {

  @Input() file: number;
  @Input() rank: number;
  @Input() value: string;
  @Input() dndStart: boolean;
  @Input() dndEnd: boolean;
  @Input() dndIndicator: boolean;

  @ViewChild('root', {static: true}) root: ElementRef;
  @ViewChild('pieceImg', {static: true}) pieceImg: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewChecked() {
    if (this.pieceImg !== undefined) {
      const cellSize = this.root.nativeElement.getBoundingClientRect().width;
      this.renderer.setStyle(this.pieceImg.nativeElement, 'width', cellSize + 'px');
      this.renderer.setStyle(this.pieceImg.nativeElement, 'height', cellSize + 'px');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const dndHighlightChanges = changes.dndStart;
    if (dndHighlightChanges !== undefined && this.pieceImg !== undefined) {
      if (dndHighlightChanges.currentValue) {
        this.renderer.setStyle(this.pieceImg.nativeElement, 'opacity', '0.0');
      } else {
        this.renderer.setStyle(this.pieceImg.nativeElement, 'opacity', '1.0');
      }
    }
  }

  getCellClass() {
    if (this.dndEnd) {
      return 'dnd-end-cell';
    }

    if (this.dndStart) {
      return 'dnd-start-cell';
    }

    if (this.dndIndicator) {
      return 'dnd-indicator-cell';
    }

    const whiteCell = (this.file + this.rank) % 2 !== 0;
    return whiteCell ? 'white-cell' : 'black-cell';
  }

}
