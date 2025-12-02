import type {
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest,
  GoogleLoginResponse,
  AuthResponse,
  User,
  ApiError
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://balancerealestate.runasp.net/api';

class AuthAPI {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = `${API_BASE_URL}/auth`;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw new Error(errorData.detail || errorData.title || 'An error occurred');
      }

      // Handle 204 No Content responses
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/profile', {
      method: 'GET',
    });
  }

  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    return this.request<void>('/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

  async logout(): Promise<void> {
    // Clear token - will be handled by AuthContext
    this.token = null;
    return Promise.resolve();
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const url = `${this.baseURL}/forgot-password`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.title || 'Failed to send reset email');
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch {
        // JSON parsing failed, return default message
        return { message: 'Password reset link sent to your email.' };
      }
    } else {
      // No JSON content, return default message for successful request
      return { message: 'Password reset link sent to your email.' };
    }
  }

  async resetPassword(resetData: ResetPasswordRequest): Promise<{ message: string }> {
    return this.request<{ message: string }>('/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  }

  async googleLogin(googleData: GoogleLoginRequest): Promise<GoogleLoginResponse> {
    return this.request<GoogleLoginResponse>('/google-login', {
      method: 'POST',
      body: JSON.stringify(googleData),
    });
  }

  async updateProfile(formData: FormData): Promise<User> {
    const url = `${this.baseURL}/profile`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData, // Don't set Content-Type for FormData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || errorData.title || 'Failed to update profile');
    }

    return await response.json();
  }
}

export const authAPI = new AuthAPI();
