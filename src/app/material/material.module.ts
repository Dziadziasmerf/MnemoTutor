import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatSnackBarModule,
  MatStepperModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatStepperModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [MatButtonModule, MatIconModule, MatDialogModule, MatInputModule, MatSnackBarModule, MatStepperModule,
    MatCardModule, MatChipsModule],
  declarations: []
})
export class MaterialModule { }
