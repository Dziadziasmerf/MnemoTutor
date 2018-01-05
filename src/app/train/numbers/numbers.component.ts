import {Component, HostListener, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { SpeechRecognitionService } from '../../services/speech/speech-recognition.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NumbersComponent implements OnInit {

  noNumberImg = '../assets/numbers/question.png';
  numbers: number[] = [];
  number: number;
  userNumbers: number[] = [];
  userNumber: number;
  count = 0;
  timerRunning = false;
  showListenButton: boolean;
  showSlider = false;

  imagePath: String;

  constructor(public dialogRef: MatDialogRef<NumbersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private speechRecognitionService: SpeechRecognitionService) {
    this.showListenButton = true;
  }

  ngOnInit() {
  }

  static getRandomNumber(): number {
    return Math.floor(Math.random() * 10 % 10);
  }

  onKey(event: any) {
    if (!isNaN(event.key) && this.userNumbers.length <= this.numbers.length) {
      this.userNumbers.push(Number(event.key));
      this.userNumber = Number(event.key);
    }
  }

  loadNextNumber(): void {
    this.numbers[this.numbers.length] = NumbersComponent.getRandomNumber();
  }

  goForward() {
    if (this.numbers.length === this.count + 1) {
      this.loadNextNumber();
      this.count++;
    } else {
      this.count++;
    }
  }

  goBack() {
    this.count--;
  }

  removeNumber(): void {

  }

  getPrevNumber(): string {
    return this.count > 1 ? this.getImagePath(this.numbers[this.count - 2]) : this.noNumberImg;
  }

  getCurrentNumber(): string {
    return this.count > 0 ? this.getImagePath(this.numbers[this.count - 1]) : this.noNumberImg;
}

  getNextNumber(): string {
    return this.count < this.numbers.length ? this.getImagePath(this.numbers[this.count]) : this.noNumberImg;
  }

  getImagePath(number: number) {
    return '../assets/numbers/' + number + '.png';
  }

  public setTimerStatus(data) {
    this.timerRunning = data;
    this.count = 0;
    if (data) {
      this.showSlider = true;
      this.numbers = [];
      this.userNumbers = [];
      this.loadNextNumber();
      this.loadNextNumber();
      this.count = 1;
    }
  }

  listen(): void {
    this.showListenButton = false;

    this.speechRecognitionService.record()
      .subscribe(
        (value) => {

          for (let x = 0; x < value.length; x++) {
            if (!isNaN(parseFloat(value.charAt(x)))) {
              this.userNumbers.push(Number(value.charAt(x)));
              this.userNumber = Number(value.charAt(x));
              console.log(value);
            }
          }
        },
        (err) => {
          console.log(err);
          if (err.error === 'no-speech') {
            console.log('--restatring service--');
            this.listen();
          }
        },
        () => {
          this.showListenButton = true;
          console.log('--complete--');
          this.listen();
        });
  }


}
