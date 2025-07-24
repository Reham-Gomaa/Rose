export interface Adaptor<T = unknown, R = unknown> {
  adapt(data: T): R;
}
