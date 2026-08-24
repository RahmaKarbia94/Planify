import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HelpCenterComponent } from './help-center/help-center.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'help', component: HelpCenterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];