import {Routes} from '@angular/router';
import {TrainingsComponent} from './train/trainings/trainings.component';
import {UserPanelComponent} from './user-account/user-panel/user-panel.component';
import {AuthGard} from './services/auth/auth.gard';

export const appRoutes: Routes = [
  { path: 'train', component: TrainingsComponent},
  { path: 'account', component: UserPanelComponent, canActivate: [AuthGard]},
];
