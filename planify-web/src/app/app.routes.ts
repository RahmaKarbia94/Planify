import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { DashboardComponent } from './dashboard/dashboard';
import { TasksComponent } from './tasks/tasks';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];