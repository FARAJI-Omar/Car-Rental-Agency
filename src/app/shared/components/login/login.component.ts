import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/auth/auth.actions';
import {
  selectAuthError,
  selectIsAuthenticated,
  isLoadingState,
} from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;

  // Selectors
  isLoading$ = this.store.select(isLoadingState);
  error$ = this.store.select(selectAuthError);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Navigate to cars page on successful login
    this.isAuthenticated$.subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(['/cars']);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.store.dispatch(
        login({
          authRequest: {
            username,
            password,
          },
        }),
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
