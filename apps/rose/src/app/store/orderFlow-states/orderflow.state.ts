export type flowState = "cart" | "payment";

export interface orderFlowState {
  orderFlow: flowState;
}
