import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'loloof64-chesshistory',
  templateUrl: './loloof64-chesshistory.component.html',
  styleUrls: ['./loloof64-chesshistory.component.scss'],
})
export class Loloof64ChesshistoryComponent implements OnInit {

  @Input() height = 200.0;
  @Input() width = 200.0;

  elements = [];

  constructor(private changeDetector: ChangeDetectorRef,) { }

  ngOnInit() {}

  addMoveFan = (moveFan) => {
    this.elements.push({
      text: moveFan,
    });
    this.changeDetector.detectChanges();
  }

  clear = () => {
    this.elements = [];
  }

}
