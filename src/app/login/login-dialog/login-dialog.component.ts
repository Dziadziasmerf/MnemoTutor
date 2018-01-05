import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {RegisterDialogComponent} from '../register-dialog/register-dialog.component';
import {SnackBar, SnackBarType} from '../../utils/snackbar/snack-bar';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginDialogComponent {

  public hidePassword = true;
  public loginError: string;
  public password: string;
  public username: string;
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showRegisterDialog(): void {
    this.dialogRef.close();

    this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      data: {name: 'Dialog', animal: 'Animal'}
    });
  }

  private login(): void {
    this.authService.login(this.username, this.password).subscribe(response => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.dialogRef.close();
         SnackBar.showSnackBar(this.snackBar, 'Hi, ' + this.username + '!', '', undefined, SnackBarType.SUCCESS);
      },
        (error2: HttpErrorResponse) => {
        if (error2.status === 401) {
          SnackBar.showSnackBar(this.snackBar, 'Invalid username or/and password', String(error2.status), undefined, SnackBarType.ERROR);
          return;
        } else {
          SnackBar.showSnackBar(this.snackBar, 'Unexpected error occured', String(error2.status), undefined, SnackBarType.ERROR);
        }
      });
    }


}
