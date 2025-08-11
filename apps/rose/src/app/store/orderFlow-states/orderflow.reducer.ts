import { createReducer, on } from "@ngrx/store";
import { orderFlowState } from "./orderflow.state";
import { toCartState, toPaymentState } from "./orderflow.action";

export const initialFlowState: orderFlowState = {
  orderFlow: "cart",
};

export const orderFlowReducer = createReducer(
  initialFlowState,

  on(
    toPaymentState,
    (state): orderFlowState => ({
      ...state,
      orderFlow: "payment",
    })
  ),

  on(
    toCartState,
    (state): orderFlowState => ({
      ...state,
      orderFlow: "cart",
    })
  )
);
