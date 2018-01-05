import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  @Input() enableCloseButton: boolean;
  @Output() close = new EventEmitter();
  @Output() moveLeft = new EventEmitter();
  @Output() moveRight = new EventEmitter();
  @Input() prevImg: string;
  @Input() nextImg: string;
  @Input() currentImg: string;
  closeButtonVisible = false;
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.moveRightAction();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.moveLeftAction();
    }
    console.log(event);
  }

  hideCloseButton(): void {
    this.closeButtonVisible = false;
  }

  showCloseButton(): void {
    this.closeButtonVisible = this.enableCloseButton;
  }
  closeAction(): void {
    this.close.emit('closeButtonClicked');
  }
  moveLeftAction(): void {
    this.moveLeft.emit('moveLeft');
  }
  moveRightAction(): void {
    this.moveRight.emit('moveRight');
  }

}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

