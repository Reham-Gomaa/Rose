import { createFeatureSelector, createSelector } from "@ngrx/store";
import { orderFlowState } from "./orderflow.state";

export const selectOrderFlowState = createFeatureSelector<orderFlowState>("orderFlow");

export const selectOrderFlow = createSelector(
  selectOrderFlowState,
  (state: orderFlowState) => state.orderFlow
);
