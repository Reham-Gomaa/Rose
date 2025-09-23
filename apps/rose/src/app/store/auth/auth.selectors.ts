import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectToken = createSelector(selectAuthState, (state) => state.token);
