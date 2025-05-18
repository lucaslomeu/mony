import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected authService = inject(AuthService);
  protected router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginError = false;

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.error('Form is invalid');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        this.loginError = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.loginError = true;
        console.error('Login failed', err);
      },
      complete: () => {
        console.log('Login request completed');
      },
    });
  }
}
