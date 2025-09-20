import { createReducer, on } from "@ngrx/store";
import { AuthState } from "./auth.state";
import * as AuthActions from "./auth.actions";

export const initialState: AuthState = {
  token: null,
};

export const tokenReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
  })),
);
