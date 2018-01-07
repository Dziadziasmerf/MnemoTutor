import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NumbersComponent} from '../numbers/numbers.component';
import {CardsComponent} from '../cards/cards.component';
import {Result, ResultsService} from '../../services/results/results.service';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingsComponent implements OnInit {

  filter = 'all';
  speedCardsBestTime: number;
  speedCardsBestScore: number;
  fiveMinutesNumbersBestScore: number;

  constructor(public dialog: MatDialog,
              private resultsService: ResultsService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.getFiveMinutesNumbersBestScore();
      this.getSpeedCardsBestTime();

    }
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  showDiscipline(discipline: string): boolean {
    return this.filter === 'all' ? true : this.filter === discipline;
  }

  showNumbersDialog(): void {
    this.dialog.open(NumbersComponent);
  }

  showCardsDialog(): void {
    this.dialog.open(CardsComponent);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') && true;
  }

  getSpeedCardsBestTime(): void {
    this.resultsService.getResultsByDiscipline(this.authService.getUserLogin(), 'Speed cards').subscribe(data => {
      const result = data as Result[];
      this.speedCardsBestScore = Math.max.apply(Math, result.map(r => r.score));
      this.speedCardsBestTime = Math.min.apply(Math, result.filter(r => r.score === this.speedCardsBestScore).map(r => r.time));

    });
  }

  getFiveMinutesNumbersBestScore(): void {
    this.resultsService.getResultsByDiscipline(this.authService.getUserLogin(), '5 minutes numbers').subscribe(data => {
      const result = data as Result[];
      this.fiveMinutesNumbersBestScore = Math.max.apply(Math, result.map(r => r.score));
    });
  }
}

