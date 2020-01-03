import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface Exercise {
  title: string;
  path: string;
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title: string;
  sampleExercises: Exercise[];

  constructor(private http: HttpClient, private router: Router,
    private translate: TranslateService) {
      this.title = this.translate.instant('tab1.sample_exercises');
      this.sampleExercises = [
        {
          title: this.translate.instant('tab1.sample_1'),
          path: '/assets/sample_chess_games/sample_1.pgn',
        },
        {
          title: this.translate.instant('tab1.sample_2'),
          path: '/assets/sample_chess_games/sample_2.pgn',
        },
      ];
    }

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
      const error = this.translate.instant('tab1.no_fen_tag_in_exercise');
      console.error(error);
      alert(error);
      return;
    }
    const theFenLine = fenLines[0];
    const result = theFenLine.match(/\[FEN "(.*)"/)[1];
    return result;
  }

}
