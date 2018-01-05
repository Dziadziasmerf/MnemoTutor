import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CustomValidators} from '../../utils/validators/custom-validators';
import {ErrorStateMatcher} from '@angular/material/core';
import {User, UsersService} from '../../services/users/users.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBar, SnackBarType} from '../../utils/snackbar/snack-bar';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterDialogComponent implements OnInit {
  static requiredErrorMessage = 'You must enter a value';
  static emailErrorMessage = 'Invalid e-mail';

  accountGroup: FormGroup;
  secondStepContent: string;
  secondStepContentColor: string;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<RegisterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private usersService: UsersService, private snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.accountGroup = this.formBuilder.group({
      'userName': ['', Validators.required, CustomValidators.isUsernameTaken(this.usersService)],
      'email': ['', [Validators.required, Validators.email]],
      'passwordGroup': this.formBuilder.group({
          'password': ['', Validators.required],
          'retypePassword': ['', Validators.required]
        },
        {
          validator: CustomValidators.passwordsEquality
        })
    });
  }

  getUsernameErrorMessage(): string {
    const username = this.accountGroup.get('userName');
    return username.hasError('required')
      ? RegisterDialogComponent.requiredErrorMessage
      : username.hasError('usernameTaken') ? username.getError('usernameTaken').message
        : '';
  }

  getEmailErrorMessage(): string {
    const email = this.accountGroup.get('email');
    return email.hasError('required')
      ? RegisterDialogComponent.requiredErrorMessage
      : email.hasError('email') ? RegisterDialogComponent.emailErrorMessage
        : '';
  }

  getPasswordErrorMessage(): string {
    const password = this.accountGroup.get('passwordGroup.password');
    return password.hasError('required') ? RegisterDialogComponent.requiredErrorMessage : '';
  }

  getRetypePasswordErrorMessage(): string {
    const retypePassword = this.accountGroup.get('passwordGroup.retypePassword');
    const passwordGroup = this.accountGroup.get('passwordGroup');
    return retypePassword.hasError('required')
    ? RegisterDialogComponent.requiredErrorMessage
      : passwordGroup.hasError('passwordEquality') ? passwordGroup.getError('passwordEquality').message : '';
  }

  addUser(): void {
    if (this.accountGroup.valid) {
      const user: User = new User();
      user.username = this.accountGroup.get('userName').value;
      user.password = this.accountGroup.get('passwordGroup.password').value;
      user.email = this.accountGroup.get('email').value;
      this.usersService.addUser(user).subscribe(data => {
        },
        (error2: HttpErrorResponse) => {
          if (error2.status === 201) {
            this.secondStepContentColor = 'green';
            this.secondStepContent = 'Account created. You can now log in.';
          } else {
            this.secondStepContentColor = 'darkred';
            this.secondStepContent = 'Unexpected error occured. Please try again later.';
          }
        });
    } else {
      SnackBar.showSnackBar(this.snackBar, 'Form is invalid', '', undefined, SnackBarType.ERROR);
    }
  }
}

export class ParentErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    const controlTouched = !!(control && (control.dirty || control.touched));
    const controlInvalid = !!(control && control.invalid);
    const parentInvalid = !!(control && control.parent && control.parent.invalid && (control.parent.dirty || control.parent.touched));

    return isSubmitted || (controlTouched && (controlInvalid || parentInvalid));
  }
}


