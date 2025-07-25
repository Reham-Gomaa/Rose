import { Observable } from 'rxjs';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeleteMeResponse,
  EditProfileRequest,
  EditProfileResponse,
  ErrorResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LogoutResponse,
  ProfileDataResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  UpdateRoleRequest,
  UpdateRoleResponse,
  UploadPhotoRequest,
  UploadPhotoResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeResponse,
} from '../interface/auth-response.interface';

export abstract class AuthAPI {
  abstract login(
    data: SignInRequest
  ): Observable<SignInResponse | ErrorResponse>;
  abstract register(
    data: SignUpRequest
  ): Observable<SignUpResponse | ErrorResponse>;
  abstract forgetPassword(
    data: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse | ErrorResponse>;
  abstract verifyCode(
    data: VerifyResetCodeRequest
  ): Observable<VerifyResetCodeResponse | ErrorResponse>;
  abstract resetPassword(
    data: ResetPasswordRequest
  ): Observable<ResetPasswordResponse | ErrorResponse>;
  abstract logout(): Observable<LogoutResponse | ErrorResponse>;

  // User Management Methods
  abstract changePassword(
    data: ChangePasswordRequest
  ): Observable<ChangePasswordResponse | ErrorResponse>;
  abstract uploadPhoto(
    data: UploadPhotoRequest
  ): Observable<UploadPhotoResponse | ErrorResponse>;
  abstract getProfileData(): Observable<ProfileDataResponse | ErrorResponse>;
  abstract deleteMe(): Observable<DeleteMeResponse | ErrorResponse>;
  abstract editProfile(
    data: EditProfileRequest
  ): Observable<EditProfileResponse | ErrorResponse>;
  abstract updateRole(
    userId: string,
    data: UpdateRoleRequest
  ): Observable<UpdateRoleResponse | ErrorResponse>;
}
