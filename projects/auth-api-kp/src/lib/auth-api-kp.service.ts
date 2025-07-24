import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

import { API_CONFIG } from './config/auth-api-config.token';
import { ApiConfig } from './interface/api-config.interface';
import { AuthAPIAdaptorService } from './adaptor/auth-api.adaptor';
import {
  AuthResponse,
  AdaptedAuthResponse,
} from './interface/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiKpService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _authAPIAdaptorService = inject(AuthAPIAdaptorService);
  private readonly _apiConfig = inject(API_CONFIG);

  userData: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  private get fullUrl(): (key: keyof ApiConfig['endpoints']['auth']) => string {
    const { baseUrl, apiVersion, endpoints } = this._apiConfig;
    const auth = endpoints.auth;
    return (key) => `${baseUrl}/${apiVersion}/${auth[key]}`;
  }

  login(data: object): Observable<any | { error: string }> {
    return this._httpClient.post<any>(this.fullUrl('login'), data).pipe(
      map((response) => {
        const adapted = this._authAPIAdaptorService.adapt(response);
        if (adapted.token) this.userData.next(adapted);
        return adapted;
      }),
      catchError((error) => of({ error: error.message || 'Login error.' }))
    );
  }

  register(data: object): Observable<any | { error: string }> {
    return this._httpClient.post<any>(this.fullUrl('register'), data).pipe(
      map((res) => this._authAPIAdaptorService.adapt(res)),
      catchError((error) => of({ error: error.message || 'Register error.' }))
    );
  }

  forgetPassword(data: object): Observable<any> {
    return this._httpClient
      .post<any>(this.fullUrl('forgotPassword'), data)
      .pipe(
        map((res) => res),
        catchError((error) =>
          of({ error: error.message || 'Forget password error.' })
        )
      );
  }

  verifyCode(data: object): Observable<any> {
    return this._httpClient
      .post<any>(this.fullUrl('verifyResetCode'), data)
      .pipe(
        map((res) => res),
        catchError((error) =>
          of({ error: error.message || 'Verify code error.' })
        )
      );
  }

  resetPassword(data: object): Observable<any> {
    return this._httpClient.put<any>(this.fullUrl('resetPassword'), data).pipe(
      map((res) => res),
      catchError((error) =>
        of({ error: error.message || 'Reset password error.' })
      )
    );
  }

  logout(): Observable<{ message: string } | { error: string }> {
    return this._httpClient.get<any>(this.fullUrl('logout')).pipe(
      map(() => {
        this.userData.next(null);
        localStorage.removeItem('userToken');
        return { message: 'Logged out successfully.' };
      }),
      catchError((error) => of({ error: error.message || 'Logout error.' }))
    );
  }
}
