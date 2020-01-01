import { Injectable } from '@angular/core';
import Chess from 'chess.js';

export interface ChessCell {
  file: number;
  rank: number;
}

export interface MoveResult {
  san: string;
  color: string;
}

@Injectable()
export class Loloof64ChessLogicService {

  private game = new Chess('8/8/8/8/8/8/8/8 w - - 0 1');

  constructor() { }

  moveNumber = () => {
    return parseInt(this.game.fen().split(' ')[5]);
  }

  newGame = (startPosition: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') => {
    this.game = new Chess(startPosition);
  }

  isStalemate = () => {
    return this.game.in_stalemate();
  }

  isThreeFoldRepetition = () => {
    return this.game.in_threefold_repetition();
  }

  isDrawByMissingMaterial = () => {
    return this.game.insufficient_material();
  }

  isDrawByFiftyMovesRule = () => {
    return this.game.in_draw() && (! this.game.insufficient_material());
  }

  isCheckmate = () => {
    return this.game.in_checkmate();
  }

  getCurrentPosition = () => {
    return this.game.fen();
  }

  checkAndDoMove = (start: ChessCell, end: ChessCell) : Promise<MoveResult> => {
    return new Promise((resolve) => {
      const fromCell = this.cellToCoordsString(start);
      const toCell = this.cellToCoordsString(end);
      
      const moveResult = this.game.move({ from: fromCell, to: toCell });
      resolve(moveResult);
    });
  }

  checkAndDoMoveWithPromotion = (start: ChessCell, end: ChessCell, promotion: string) : Promise<MoveResult> => {
    return new Promise((resolve) => {
      const fromCell = this.cellToCoordsString(start);
      const toCell = this.cellToCoordsString(end);
      
      const moveResult = this.game.move({ from: fromCell, to: toCell, promotion, });
      resolve(moveResult);
    });
  }

  private cellToCoordsString(cell: ChessCell): string {
    const fileStr = String.fromCharCode('a'.charCodeAt(0) + cell.file);
    const rankStr = String.fromCharCode('1'.charCodeAt(0) + cell.rank);

    return `${fileStr}${rankStr}`;
  }

  isWhiteTurn = () => {
    return this.game.turn() === 'w';
  }

  fen = () => {
    return this.game.fen();
  }

  setPosition = (fen) => {
    this.game.load(fen);
  }
}
