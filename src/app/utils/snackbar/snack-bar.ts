import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
export class SnackBar {

  static showSnackBar(snackBar: MatSnackBar, content: string, action: string, duration?: number, type?: SnackBarType): void {
    if (type || duration) {
      const config = new MatSnackBarConfig();
      config.panelClass = type ? [type] : [];
      config.duration = duration ? duration : 3000;
      snackBar.open(content, action, config);
    } else {
      snackBar.open(content, action);
    }

  }
}

export enum SnackBarType {
  SUCCESS = 'snackbar-success',
  ERROR = 'snackbar-error'
}
