import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import type { 
  User, 
  AuthContextType, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest,
  ResetPasswordRequest,
  GoogleLoginRequest 
} from '../types';
import { authAPI } from '../services/authAPI';
import { useToast } from './useToast';
import { useLanguage } from './useLanguage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const { currentLanguage } = useLanguage();

  const isAuthenticated = !!user && !!token;

  const clearError = () => setError(null);

  // Update authAPI token whenever token changes
  useEffect(() => {
    authAPI.setToken(token);
  }, [token]);

  // Check if user is authenticated on app load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        } catch {
          // Token is invalid, clear it
          localStorage.removeItem('authToken');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      setToken(response.token);
      setUser(response.user);
      
      showToast(
        'success', 
        currentLanguage.code === 'ar' 
          ? 'تم تسجيل الدخول بنجاح' 
          : 'Login successful'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في تسجيل الدخول' 
          : message
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      setToken(response.token);
      setUser(response.user);
      
      showToast(
        'success', 
        currentLanguage.code === 'ar' 
          ? 'تم إنشاء الحساب بنجاح' 
          : 'Account created successfully'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في إنشاء الحساب' 
          : message
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local state
      localStorage.removeItem('authToken');
      setToken(null);
      setUser(null);
      
      showToast(
        'success', 
        currentLanguage.code === 'ar' 
          ? 'تم تسجيل الخروج بنجاح' 
          : 'Logged out successfully'
      );
    }
  };

  const googleLogin = async (googleData: GoogleLoginRequest): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authAPI.googleLogin(googleData);
      
      // Store token
      localStorage.setItem('authToken', response.token);
      setToken(response.token);
      
      // Fetch user data separately using the token
      try {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
      } catch (userError) {
        console.error('Failed to fetch user data after Google login:', userError);
      }
      
      showToast(
        'success', 
        currentLanguage.code === 'ar' 
          ? 'تم تسجيل الدخول بنجاح' 
          : 'Login successful'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Google login failed';
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في تسجيل الدخول بـ Google' 
          : message
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (passwordData: ChangePasswordRequest): Promise<void> => {
    try {
      await authAPI.changePassword(passwordData);
      showToast(
        'success', 
        currentLanguage.code === 'ar' 
          ? 'تم تغيير كلمة المرور بنجاح' 
          : 'Password changed successfully'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Password change failed';
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في تغيير كلمة المرور' 
          : message
      );
      throw error;
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      const response = await authAPI.forgotPassword(email);
      // Use API response message with fallback
      const successMessage = response.message || 
        (currentLanguage.code === 'ar' 
          ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' 
          : 'Password reset link sent to your email');
      
      showToast('success', successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send reset link';
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في إرسال رابط إعادة التعيين. تحقق من البريد الإلكتروني.' 
          : 'Failed to send reset link. Please check your email address.'
      );
      throw error;
    }
  };

  const resetPassword = async (resetData: ResetPasswordRequest): Promise<void> => {
    try {
      const response = await authAPI.resetPassword(resetData);
      // Use API response message with fallback
      const successMessage = response.message || 
        (currentLanguage.code === 'ar' 
          ? 'تم إعادة تعيين كلمة المرور بنجاح' 
          : 'Password reset successfully');
      
      showToast('success', successMessage);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Password reset failed';
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في إعادة تعيين كلمة المرور. تحقق من صحة البيانات.' 
          : 'Password reset failed. Please check your information.'
      );
      throw error;
    }
  };

  const refreshUserData = async (): Promise<void> => {
    if (!token) return;
    
    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Token might be invalid, trigger logout
      await logout();
    }
  };

  const updateUser = async (formData: FormData): Promise<void> => {
    if (!user) return;
    
    try {
      const updatedUser = await authAPI.updateProfile(formData);
      setUser(updatedUser);
      showToast(
        'success', 
        currentLanguage.code === 'ar' 
          ? 'تم تحديث البيانات بنجاح' 
          : 'Profile updated successfully'
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      setError(message);
      showToast(
        'error', 
        currentLanguage.code === 'ar' 
          ? 'فشل في تحديث البيانات' 
          : message
      );
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    loading: isLoading, // alias for compatibility
    error,
    login,
    register,
    logout,
    googleLogin,
    changePassword,
    forgotPassword,
    resetPassword,
    refreshUserData,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
