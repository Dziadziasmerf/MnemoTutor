import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material';
import {NumbersComponent} from '../numbers/numbers.component';
import {CardsComponent} from '../cards/cards.component';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingsComponent implements OnInit {

  filter = 'all';

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
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
}
