import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'] 
})
export class AuthComponent {
  isLogin = true;
  fullName = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.isLogin) {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => console.error('Authentication failed', err)
      });
    } else {
      this.authService.register({ fullName: this.fullName, email: this.email, password: this.password }).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => console.error('Registration failed', err)
      });
    }
  }
}