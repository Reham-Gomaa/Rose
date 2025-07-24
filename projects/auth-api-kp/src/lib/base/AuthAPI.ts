import { Observable } from "rxjs";

export abstract class AuthAPI {
  abstract login(data: object): Observable<unknown>;
  abstract register(data: object): Observable<unknown>;
  abstract forgetPassword(data: object): Observable<unknown>;
  abstract verifyCode(data: object): Observable<unknown>;
  abstract resetPassword(data: object): Observable<unknown>;
  abstract logout(): Observable<unknown>;
}
