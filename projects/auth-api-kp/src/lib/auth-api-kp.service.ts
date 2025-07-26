import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, catchError, tap, map } from 'rxjs';

import { API_CONFIG } from './config/auth-api-config.token';
import { ApiConfig } from './interface/api-config.interface';
import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  UploadPhotoRequest,
  UploadPhotoResponse,
  ProfileDataResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  DeleteMeResponse,
  EditProfileRequest,
  EditProfileResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
  ErrorResponse,
  User,
} from './interface/auth-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthApiKpService {
  private readonly _http = inject(HttpClient);
  private readonly _config = inject(API_CONFIG);

  userData = new BehaviorSubject<User | null>(null);

  private get fullUrl(): (key: keyof ApiConfig['endpoints']['auth']) => string {
    const { baseUrl, apiVersion, endpoints } = this._config;
    return (key) => `${baseUrl}/${apiVersion || ''}/${endpoints.auth[key]}`;
  }

  private handleError = (message: string) => (error: any) =>
    of({ error: error?.message || message });

  login(data: SignInRequest): Observable<SignInResponse | ErrorResponse> {
    return this._http.post<SignInResponse>(this.fullUrl('login'), data).pipe(
      tap((res) => {
        if (res.token && res.user) {
          this.userData.next(res.user);
        }
      }),
      catchError(this.handleError('Login failed.'))
    );
  }

  register(data: SignUpRequest): Observable<SignUpResponse | ErrorResponse> {
    return this._http.post<SignUpResponse>(this.fullUrl('register'), data).pipe(
      tap((res) => {
        if (res.token && res.user) {
          this.userData.next(res.user);
        }
      }),
      catchError(this.handleError('Registration failed.'))
    );
  }

  forgetPassword(
    data: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse | ErrorResponse> {
    return this._http
      .post<ForgotPasswordResponse>(this.fullUrl('forgotPassword'), data)
      .pipe(catchError(this.handleError('Forget password failed.')));
  }

  verifyCode(
    data: VerifyResetCodeRequest
  ): Observable<VerifyResetCodeResponse | ErrorResponse> {
    return this._http
      .post<VerifyResetCodeResponse>(this.fullUrl('verifyResetCode'), data)
      .pipe(catchError(this.handleError('Verify code failed.')));
  }

  resetPassword(
    data: ResetPasswordRequest
  ): Observable<ResetPasswordResponse | ErrorResponse> {
    return this._http
      .put<ResetPasswordResponse>(this.fullUrl('resetPassword'), data)
      .pipe(catchError(this.handleError('Reset password failed.')));
  }

  logout(): Observable<LogoutResponse | ErrorResponse> {
    return this._http.get<LogoutResponse>(this.fullUrl('logout')).pipe(
      tap(() => {
        this.userData.next(null);
      }),
      map(() => ({ message: 'Logged out successfully.' })),
      catchError(this.handleError('Logout failed.'))
    );
  }

  changePassword(
    data: ChangePasswordRequest
  ): Observable<ChangePasswordResponse | ErrorResponse> {
    return this._http
      .put<ChangePasswordResponse>(this.fullUrl('changePassword'), data)
      .pipe(catchError(this.handleError('Change password failed.')));
  }

  uploadPhoto(
    data: UploadPhotoRequest
  ): Observable<UploadPhotoResponse | ErrorResponse> {
    const form = new FormData();
    form.append('photo', data.photo as any);

    return this._http
      .put<UploadPhotoResponse>(this.fullUrl('uploadPhoto'), form)
      .pipe(catchError(this.handleError('Upload photo failed.')));
  }

  getProfileData(): Observable<ProfileDataResponse | ErrorResponse> {
    return this._http
      .get<ProfileDataResponse>(this.fullUrl('profileData'))
      .pipe(
        tap((res) => this.userData.next(res.user)),
        catchError(this.handleError('Fetch profile failed.'))
      );
  }

  deleteMe(): Observable<DeleteMeResponse | ErrorResponse> {
    return this._http.delete<DeleteMeResponse>(this.fullUrl('deleteMe')).pipe(
      tap(() => this.userData.next(null)),
      catchError(this.handleError('Delete account failed.'))
    );
  }

  editProfile(
    data: EditProfileRequest
  ): Observable<EditProfileResponse | ErrorResponse> {
    return this._http
      .put<EditProfileResponse>(this.fullUrl('editProfile'), data)
      .pipe(
        tap((res) => this.userData.next(res.user)),
        catchError(this.handleError('Edit profile failed.'))
      );
  }

  updateRole(
    data: UpdateRoleRequest
  ): Observable<UpdateRoleResponse | ErrorResponse> {
    return this._http
      .put<UpdateRoleResponse>(this.fullUrl('editProfile'), data)
      .pipe(
        tap((res) => this.userData.next(res.user)),
        catchError(this.handleError('Update role failed.'))
      );
  }
}
