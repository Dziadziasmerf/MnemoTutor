import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Observable, Subscription} from 'rxjs/';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimerComponent implements OnInit {

  @Output() timerEvent: EventEmitter<boolean> = new EventEmitter();

  counting = false;

  ticks = 0;
  minutesDisplay = '00';
  hoursDisplay = '00';
  secondsDisplay = '00';

  subscription: Subscription;

  constructor() {
  }

  ngOnInit() {
  }

  private startTimer() {
    this.counting = true;
    const timer = Observable.timer(1, 1000);
    const start = 15;
    this.sendTimerStatus(true);
    this.subscription = timer.map(i => start - i).take(start + 1).subscribe(
      t => {
        this.ticks = t;

        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
        if (this.secondsDisplay === '00' && this.minutesDisplay === '00' && this.hoursDisplay === '00') {
          this.sendTimerStatus(false);
          this.subscription.unsubscribe();
          this.counting = false;
        }
      }
    );
  }

  sendTimerStatus(running: boolean) {
    this.timerEvent.emit(running);
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }

}