import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { DashboardComponent } from './dashboard/dashboard';
import { TasksComponent } from './tasks/tasks';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'projects/:id/tasks', component: TasksComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];