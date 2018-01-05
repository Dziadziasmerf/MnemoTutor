import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {UsersService} from '../../services/users/users.service';
import {HttpErrorResponse} from '@angular/common/http';

export class CustomValidators {

  static passwordsEquality(formGroup: FormGroup): ValidationErrors {
    const password = formGroup.get('password').value;
    const retypePassword = formGroup.get('retypePassword').value;

    const passwordEqual = password === retypePassword;

    const message = {
      'passwordEquality': {
        'message': 'Passwords are not equal'
      }
    };
    return passwordEqual ? null : message;
  }

  static isUsernameTaken(usersService: UsersService) {
    return (control: AbstractControl) => {
      return new Promise(resolve => {
        usersService.isUsernameTaken(control.value)
          .subscribe(data => {
            },
            (error2: HttpErrorResponse) => {
              if (error2.status === 404) {
                resolve(null);
              } else {
                resolve({
                  'usernameTaken': {
                    'message': 'This username is already in use'
                  }
                });
              }
            });
      });
    };
  }
}
