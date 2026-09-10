import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../services/theme';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'] 
})
export class AuthComponent {
  isLogin = true;
  showPassword = false;
  showConfirmPassword = false;
  
  // OTP Verification States
  isOtpStep = false;
  otpDigits = ['', '', '', '', '', ''];
  
  authForm = { 
    username: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  };

  constructor(
    private http: HttpClient, 
    private router: Router,
    public themeService: ThemeService
  ) {}

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.authForm = { username: '', email: '', password: '', confirmPassword: '' };
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.isOtpStep = false; // reset OTP view
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirmPassword(): void { this.showConfirmPassword = !this.showConfirmPassword; }

  passwordsMatch(): boolean {
    return this.authForm.password === this.authForm.confirmPassword;
  }

  onSubmit(): void {
    if (!this.isLogin && !this.passwordsMatch()) return;

    const endpoint = this.isLogin ? '/api/auth/login' : '/api/auth/register';
    const url = `http://localhost:3000${endpoint}`;

    // Note: The backend model expects "fullName" rather than "username" based on previous schemas
    const payload = this.isLogin 
      ? { email: this.authForm.email, password: this.authForm.password }
      : { fullName: this.authForm.username, email: this.authForm.email, password: this.authForm.password };

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        if (this.isLogin) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        } else {
          // Trigger OTP view upon successful registration
          this.isOtpStep = true;
        }
      },
      error: (err: any) => {
        console.error('Auth Error:', err);
        alert(err.error?.message || 'Authentication failed');
      }
    });
  }

  // --- OTP Logic ---
  onOtpInput(event: any, index: number): void {
    const inputVal = event.target.value;
    
    // Auto-advance focus to the next box
    if (inputVal && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Auto-regress focus on Backspace
    if (event.key === 'Backspace' && !inputVal && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  }

  verifyOtp(): void {
    const otp = this.otpDigits.join('');
    if (otp.length !== 6) {
      alert('Please enter the complete 6-digit code.');
      return;
    }

    const url = `http://localhost:3000/api/auth/verify-otp`;
    this.http.post(url, { email: this.authForm.email, otp }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        alert(err.error?.message || 'Invalid or expired OTP');
      }
    });
  }
}