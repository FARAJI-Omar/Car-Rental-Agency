import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.store';
import { login, loginFailed, loginSuccess, logout } from './auth.actions';

export const AuthReducer = createReducer(
  initialAuthState,
  on(login, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })),
  on(loginFailed, (state, { error }) => ({
    ...state,
    error: error,
    isAuthenticated: false,
    isLoading: false,
    user: null,
  })),
  on(logout, () => initialAuthState),
);
