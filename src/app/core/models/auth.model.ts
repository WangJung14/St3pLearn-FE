export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | string;
}

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  fullName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}
