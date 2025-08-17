import { createAction, props } from "@ngrx/store";

export const loginSuccess = createAction(
  "[Auth/API] Login Success",
  props<{ token: string }>()
);
