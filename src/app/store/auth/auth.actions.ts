import { createAction, props } from '@ngrx/store';
import { User, AuthRequest } from '../../core/models/user.model';

export const login = createAction('[Auth] Login', props<{ authRequest: AuthRequest }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());

export const loginFailed = createAction('[Auth] Login Failed', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
