import { inject } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { login, loginFailed, loginSuccess, logout } from './auth.actions';
import { User } from '../../core/models/user.model';

// Login effect
export const loginEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) =>
    actions$.pipe(
      ofType(login),
      mergeMap(({ authRequest }) =>
        authService.login(authRequest).pipe(
          map(({ user }) => loginSuccess({ user })),
          catchError((error) => of(loginFailed({ error: error.message || 'Login failed' }))),
        ),
      ),
    ),
  { functional: true },
);

// Save token to localStorage on login success
export const saveTokenEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(loginSuccess),
      tap(({ user }) => {
        localStorage.setItem('auth_token', user.accessToken);
        localStorage.setItem(
          'user_data',
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
          }),
        );
      }),
    ),
  { functional: true, dispatch: false },
);

// Load token from localStorage on app init
export const loadTokenEffect = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          const user: User = {
            ...parsedUser,
            accessToken: token,
            refreshToken: '',
          };
          return loginSuccess({ user });
        }
        return { type: '[Auth] No Stored Session' };
      }),
    ),
  { functional: true },
);

// Clear token from localStorage and redirect on logout
export const logoutEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        router.navigate(['/login']);
      }),
    ),
  { functional: true, dispatch: false },
);
