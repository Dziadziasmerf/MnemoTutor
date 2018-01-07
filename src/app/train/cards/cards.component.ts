import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {TrainingStatus} from '../numbers/numbers.component';
import {Result, ResultsService} from '../../services/results/results.service';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {

  TrainingStatus = TrainingStatus;
  trainingStatus = TrainingStatus.NONE;
  noCardImg = '../assets/numbers/question.png';
  discipline = 'Speed cards';
  deck: Array<Card>;
  recallDeck: Array<Card>;
  timeInSec: number;
  count = 0;
  color = 'hearts';
  cards: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  colors: string[] = ['hearts', 'spades', 'clubs', 'diamonds'];

  constructor(private resultsService: ResultsService,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<CardsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.deck = [];
    for (const color of this.colors) {
      for (const figure of this.cards) {
        this.deck.push(new Card(color, figure));
      }
    }
    this.deck = this.shuffleDeck(this.deck);
  }

  setColor(color: string) {
    this.color = color;
  }

  selectCard(card: string) {
    if (this.recallDeck.length < this.deck.length) {
      this.recallDeck.splice(this.count, 0, new Card(this.color, card));
      this.count++;
    }
  }

  getCardImageFromStrings(color: string, figure: string): string {
    return this.getCardImage(new Card(color, figure));
  }

  getCardImage(card: Card): string {
    return '../../../assets/cards/' + card.color + '/' + card.figure + '.png';
  }

  timerStatusChanged(isCounting: boolean): void {
    if (isCounting) {
      this.trainingStatus = TrainingStatus.START;
      this.count = 1;
    } else {
      this.trainingStatus = TrainingStatus.RECALL;
      this.count = 0;
      this.recallDeck = [];
    }
  }

  getCurrentCard(): string {
    return this.count > 0 ? this.getCardImage(this.getDeck()[this.count - 1]) : this.noCardImg;
  }

  getPrevCard(): string {
    return this.count > 1 ? this.getCardImage(this.getDeck()[this.count - 2]) : this.noCardImg;
  }

  getNextCard(): string {
    return this.count < this.getDeck().length ? this.getCardImage(this.getDeck()[this.count]) : this.noCardImg;
  }

  removeCard(): void {
    if (this.count > 0) {
      this.recallDeck.splice(this.count - 1, 1);
      if (this.count > this.recallDeck.length) {
        this.count--;
      }
    }
  }

  goBack() {
    if (this.count > 1) {
      this.count--;
    }
  }

  goForward() {
    if (this.count < this.getDeck().length) {
      this.count++;
    }
  }

  getCardFilter(): string {
    if (this.trainingStatus !== TrainingStatus.END) {
      return 'none';
    }
    return this.recallDeck[this.count - 1].equals(this.deck[this.count - 1]) ? 'correct' : 'error';
  }

  timerResult(result) {
    this.timeInSec = result;
  }

  getTime(): string {
    const hours = Math.floor((this.timeInSec / 60) / 60);
    const minutes = Math.floor(this.timeInSec / 60) % 60;
    const sec = this.timeInSec % 60;
    return (hours > 0 ? hours + ' hours' : '')
            + ((minutes > 0) ? minutes + ' minutes' : '')
            + ((sec > 0) ? sec + ' seconds' : '');
  }

  getScore(): number {
    let score = 0;
    for (let i = 0; i < this.recallDeck.length; i++) {
      if (this.recallDeck[i].equals(this.deck[i])) {
        score++;
      }
    }
    return score;
  }

  shuffleDeck(deck: Card[]) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  getDeck(): Card[] {
    return this.trainingStatus === TrainingStatus.START ? this.deck :
      this.trainingStatus !== TrainingStatus.NONE ? this.recallDeck : [];
  }

  deckContains(color: string, figure: string): boolean {
    return this.getDeck().some(card => card.figure === figure && card.color === color);
  }

  validate(): void {
    this.count = 1;
    this.trainingStatus = TrainingStatus.END;
    const username = this.authService.getUserLogin();
    if (username) {
      const result = new Result();
      result.username = username;
      result.discipline = this.discipline;
      result.score = this.getScore();
      result.time = this.timeInSec;
      this.resultsService.sendResult(result).subscribe();
    }
  }

  reset(): void {
    this.recallDeck = [];
    this.shuffleDeck(this.deck);
    this.count = 0;
    this.trainingStatus = TrainingStatus.NONE;
  }

}

export class Card {
  color: string;
  figure: string;

  constructor(color: string, figure: string) {
    this.color = color;
    this.figure = figure;
  }

  equals(other: Card): boolean {
    return this.color === other.color && this.figure === other.figure;
  }
}
/* TODO ogarnąć na klasach/enumach
 export class CardColor {
 static CLUBS = new CardColor('clubs');
 static SPADES = new CardColor('spades');
 static HEARTS = new CardColor('hearts');
 static DIAMONDS = new CardColor('diamonds');

 constructor(public value: string) {
 }

 toString() {
 return this.value;
 }
 }

 export class CardFigure {
 static TWO = new CardFigure('2');
 static THREE = new CardFigure('3');
 static FOUR = new CardFigure('4');
 static FIVE = new CardFigure('5');
 static SIX = new CardFigure('6');
 static SEVEN = new CardFigure('7');
 static EIGHT = new CardFigure('8');
 static NINE = new CardFigure('9');
 static TEN = new CardFigure('10');
 static JACK = new CardFigure('jack');
 static QUEEN = new CardFigure('queen');
 static KING = new CardFigure('king');
 static ACE = new CardFigure('ace');

 constructor(public value: string) {
 }

 toString() {
 return this.value;
 }
 }  */

