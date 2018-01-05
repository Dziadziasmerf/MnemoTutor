import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';

import { AppComponent } from './app.component';
import { NumbersComponent } from './train/numbers/numbers.component';
import {SpeechRecognitionService} from './services/speech/speech-recognition.service';
import { TimerComponent } from './utils/timer/timer.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginDialogComponent } from './login/login-dialog/login-dialog.component';
import {AuthenticationService} from './services/auth/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './services/auth/token.interceptor';
import { RegisterDialogComponent } from './login/register-dialog/register-dialog.component';
import {UsersService} from './services/users/users.service';
import { CardsComponent } from './train/cards/cards.component';
import { TrainingsComponent } from './train/trainings/trainings.component';
import { SliderComponent } from './utils/slider/slider.component';

const appRoutes: Routes = [
  { path: 'train', component: TrainingsComponent}];

@NgModule({
  declarations: [
    AppComponent,
    NumbersComponent,
    TimerComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    CardsComponent,
    TrainingsComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    )
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent, NumbersComponent, CardsComponent],
  providers: [ SpeechRecognitionService, AuthenticationService, UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
