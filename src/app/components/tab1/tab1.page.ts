import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  sampleExercises = [
    {
      title: 'Sample 1',
      path: '/assets/sample_chess_games/sample_1.pgn',
    },
    {
      title: 'Sample 2',
      path: '/assets/sample_chess_games/sample_2.pgn',
    },
];

  constructor(private http: HttpClient, private router: Router) {}

  loadExercice(exercise) {
    const path = exercise.path;
    const that = this;
    this.http.get(path, {responseType: 'text'}).subscribe({
      next(content) {
        const fen = that.parseExercise(content);
        that.router.navigate(['playing-page', {fen}]);
      },
      error(err) {console.error(err);}
    });
  }

  parseExercise(exercisePgn) {
    const lines = exercisePgn.split(/(\r?)\n/g);
    const fenLines = lines.filter(singleLine => singleLine.startsWith('[FEN'));
    if (fenLines.length === 0) {
      console.error('No FEN tag in the pgn !');
      alert('No FEN tag in the pgn !');
      return;
    }
    const theFenLine = fenLines[0];
    const result = theFenLine.match(/\[FEN "(.*)"/)[1];
    return result;
  }

}
