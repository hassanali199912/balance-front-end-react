import type { User } from './User';

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  PublicIp?: string;
}

export interface ChangePasswordRequest {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface GoogleLoginResponse {
  token: string;
}

export interface UpdateProfileRequest {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  whatsAppNumber?: string;
  publicIp?: string;
  file?: File;
  pictureAvatar?: string;
  location?: string;
}

export interface ApiError {
  title: string;
  detail: string;
  status: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loading: boolean; // alias for compatibility
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (googleData: GoogleLoginRequest) => Promise<void>;
  changePassword: (passwordData: ChangePasswordRequest) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (resetData: ResetPasswordRequest) => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUser?: (formData: FormData) => Promise<void>;
  clearError: () => void;
}
