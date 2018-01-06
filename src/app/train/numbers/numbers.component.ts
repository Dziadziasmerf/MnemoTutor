import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {SpeechRecognitionService} from '../../services/speech/speech-recognition.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NumbersComponent implements OnInit {

  TrainingStatus = TrainingStatus;
  noNumberImg = '../assets/numbers/question.png';
  numbers: number[] = [];
  userNumbers: number[] = [];
  count = 0;
  showListenButton: boolean;
  trainingStatus = TrainingStatus.NONE;

  static getRandomNumber(): number {
    return Math.floor(Math.random() * 10 % 10);
  }

  constructor(public dialogRef: MatDialogRef<NumbersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private speechRecognitionService: SpeechRecognitionService) {
    this.showListenButton = true;
  }

  ngOnInit() {
  }

  loadNextNumber(): void {
    const numbersArray = this.getNumbersArray();
    numbersArray[numbersArray.length] = NumbersComponent.getRandomNumber();
  }

  goForward() {
    if (this.trainingStatus === TrainingStatus.START && this.numbers.length === this.count + 1) {
      this.loadNextNumber();
    } else if ((this.trainingStatus === TrainingStatus.RECALL
      || this.trainingStatus === TrainingStatus.END)
      && this.userNumbers.length === this.count) {
      return;
    }
    this.count++;
  }

  goBack() {
    if (this.count > 1) {
      this.count--;
    }
  }

  getNumbersArray(): number[] {
    return this.trainingStatus === TrainingStatus.START ? this.numbers :
      this.trainingStatus !== TrainingStatus.NONE ? this.userNumbers : [];
  }

  removeNumber(): void {
    if (this.count > 0) {
      this.userNumbers.splice(this.count - 1, 1);
      if (this.count > this.userNumbers.length) {
        this.count--;
      }
    }
  }

  getPrevNumber(): string {
    return this.count > 1 ? this.getImagePath(this.getNumbersArray()[this.count - 2]) : this.noNumberImg;
  }

  getCurrentNumber(): string {
    return this.count > 0 ? this.getImagePath(this.getNumbersArray()[this.count - 1]) : this.noNumberImg;
  }

  getNextNumber(): string {
    return this.count < this.getNumbersArray().length ? this.getImagePath(this.getNumbersArray()[this.count]) : this.noNumberImg;
  }

  getImagePath(number: number): string {
    return '../assets/numbers/' + number + '.png';
  }

  selectNumber(number: number): void {
    if (this.userNumbers.length < this.numbers.length) {
      this.userNumbers.splice(this.count, 0, number);
      this.count++;
    }
  }

  getScore(): number {
    let score = 0;
    for (let i = 0; i < this.userNumbers.length; i++) {
      if (this.userNumbers[i] === this.numbers[i]) {
        score++;
      }
    }
    return score;
  }

  validate(): void {
    this.trainingStatus = TrainingStatus.END;
    // TODO send score
  }

  getNumberFilter(): string {
    if (this.trainingStatus !== TrainingStatus.END) {
      return 'none';
    }
    return this.userNumbers[this.count - 1] === this.numbers[this.count - 1] ? 'correct' : 'error';
  }

  reset(): void {
    this.userNumbers = [];
    this.numbers = [];
    this.trainingStatus = TrainingStatus.NONE;

  }

  timerStatusChanged(data: boolean) {
    if (data) {
      this.trainingStatus = TrainingStatus.START;
      this.loadNextNumber();
      this.loadNextNumber();
      this.count = 1;
    } else {
      this.count = 0;
      this.trainingStatus = TrainingStatus.RECALL;
    }
  }

  /* TODO  Add voice recognition
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
   }*/
}

export enum TrainingStatus {
  NONE, START, RECALL, END
}
