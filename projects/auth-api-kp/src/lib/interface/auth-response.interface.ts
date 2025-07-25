// Base Interfaces
export interface AdaptedAuthResponse {
  message: string;
  token: string;
  userEmail: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: User;
}

export interface ErrorResponse {
  error: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  photo: string;
  role: string;
  wishlist: any[];
  addresses: any[];
  createdAt: string;
}

// Specific API Interfaces
export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender?: string;
  phone?: string;
}

export interface SignUpResponse extends AuthResponse {
  user: User;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse extends AuthResponse {
  user: User;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  token: string;
}

export interface UploadPhotoRequest {
  photo: File | string;
}

export interface UploadPhotoResponse {
  message: string;
  photoUrl: string;
}

export interface ProfileDataResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  info: string;
}

export interface VerifyResetCodeRequest {
  resetCode: string;
}

export interface VerifyResetCodeResponse {
  status: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  info: string;
}

export interface DeleteMeResponse {
  message: string;
}

export interface EditProfileRequest {
  firstName?: string;
  lastName?: string;
  gender?: string;
  phone?: string;
}

export interface EditProfileResponse {
  message: string;
  user: User;
}

export interface UpdateRoleRequest {
  role: string;
}

export interface UpdateRoleResponse {
  message: string;
  user: User;
}
