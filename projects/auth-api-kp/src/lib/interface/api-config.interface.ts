export interface ApiConfig {
  baseUrl: string;
  apiVersion?: string;
  endpoints: {
    auth: {
      login: string;
      register: string;
      logout: string;
      forgotPassword?: string;
      verifyResetCode?: string;
      resetPassword?: string;
      profileData?: string;
      editProfile?: string;
      changePassword?: string;
      deleteMe?: string;
      uploadPhoto?: string;
      forgetPasswordForm?: string;
    };
  };
}
