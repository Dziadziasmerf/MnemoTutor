import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';

import {AppComponent} from './app.component';
import {NumbersComponent} from './train/numbers/numbers.component';
import {SpeechRecognitionService} from './services/speech/speech-recognition.service';
import {TimerComponent} from './utils/timer/timer.component';
import {RouterModule} from '@angular/router';
import {LoginDialogComponent} from './login/login-dialog/login-dialog.component';
import {AuthenticationService} from './services/auth/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './services/auth/token.interceptor';
import {RegisterDialogComponent} from './login/register-dialog/register-dialog.component';
import {UsersService} from './services/users/users.service';
import {CardsComponent} from './train/cards/cards.component';
import {TrainingsComponent} from './train/trainings/trainings.component';
import {SliderComponent} from './utils/slider/slider.component';
import {ResultsService} from './services/results/results.service';
import {UserPanelComponent} from './user-account/user-panel/user-panel.component';
import {StatisticsComponent} from './user-account/statistics/statistics.component';
import {appRoutes} from './app.routing';
import {AuthGard} from './services/auth/auth.gard';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    NumbersComponent,
    TimerComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    CardsComponent,
    TrainingsComponent,
    SliderComponent,
    UserPanelComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxChartsModule,
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    )
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent, NumbersComponent, CardsComponent],
  providers: [SpeechRecognitionService, AuthenticationService, UsersService, ResultsService, AuthGard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
