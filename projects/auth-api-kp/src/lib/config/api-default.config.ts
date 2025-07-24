import { ApiConfig } from '../interface/api-config.interface';

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: '',
  apiVersion: 'v1',
  endpoints: {
    auth: {
      login: 'auth/signin',
      register: 'auth/signup',
      logout: 'auth/logout',
      forgotPassword: 'auth/forgotPassword',
      verifyResetCode: 'auth/verifyResetCode',
      resetPassword: 'auth/resetPassword',
      profileData: 'auth/profileData',
      editProfile: 'auth/editProfile',
      changePassword: 'auth/changePassword',
      deleteMe: 'auth/deleteMe',
      uploadPhoto: 'auth/uploadPhoto',
      forgetPasswordForm: 'auth/forgetPasswordForm'
    }
  }
};
