import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.store";


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
    selectAuthState ,
    (state) => state.isAuthenticated
);

export const isLoadingState = createSelector(
    selectAuthState ,
    (state) => state.isLoading
);

export const selectUser = createSelector(
    selectAuthState ,
    (state) => state.user
);

export const selectAuthError = createSelector(
    selectAuthState , 
    (state) => state.error
);


export const selectUserName = createSelector(
    selectUser ,
    (user) => user ? user.name : null
);