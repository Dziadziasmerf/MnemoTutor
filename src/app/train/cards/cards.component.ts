import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CardsComponent implements OnInit {

  color = 'hearts';
  cards: string[] = ['2', '3', '4', '5' , '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  constructor() { }

  ngOnInit() {
  }

  setColor(color: string) {
    this.color = color;
  }

  selectCard(card: string) {
    console.log(card + this.color);
  }

  getCardImage(color: string, card: string): string {
    return '../../../assets/cards/' + color + '/' + card + '.png';
  }
}
