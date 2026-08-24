import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  initForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: [''] // Only required for signup
    });
  }

  toggleMode(mode: boolean): void {
    this.isLoginMode = mode;
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;

    if (this.isLoginMode) {
      this.authService.login(this.authForm.value).subscribe({
        next: (res) => console.log('Login successful', res),
        error: (err) => console.error('Login failed', err)
      });
    } else {
      this.authService.signup(this.authForm.value).subscribe({
        next: (res) => console.log('Signup successful', res),
        error: (err) => console.error('Signup failed', err)
      });
    }
  }
}