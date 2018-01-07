import {Component, OnDestroy, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {LoginDialogComponent} from './login/login-dialog/login-dialog.component';
import {AuthenticationService} from './services/auth/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showSearchButton: boolean;

  constructor(public dialog: MatDialog, private authService: AuthenticationService) {
    this.showSearchButton = true;
  }

  ngOnInit() {
  }

  getUserLogin(): string {
    return this.authService.getUserLogin();
  }

  logout(): void {
    this.authService.logout();
  }

  showLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: {name: 'Dialog', animal: 'Animal'}
    });
  }

}
