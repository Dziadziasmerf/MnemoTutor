import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {MatDialog} from '@angular/material';
import {LoginDialogComponent} from '../../login/login-dialog/login-dialog.component';

@Injectable()
export class AuthGard implements CanActivate {

  constructor(private router: Router, public dialog: MatDialog) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      return true;
    }

    this.dialog.open(LoginDialogComponent, {
      width: '400px',
      data: {name: 'Dialog', animal: 'Animal'}
    });
  }
}

