import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useLanguage, useAuth } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import googleAuthService from '../../services/googleAuth';
import styles from '../../styles/components/auth/SignIn.module.css';

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const SignInPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const { login, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Loading state for Google OAuth
  const [googleLoading, setGoogleLoading] = useState(false);

  // Validation states for real-time feedback
  const [validationState, setValidationState] = useState({
    email: false,
    password: false
  });

  const content = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your Balance Real Estate account',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      or: 'Or',
      signInWithGoogle: 'Sign in with Google',
      signInWithGoogleLoading: 'Signing in with Google...',
      placeholders: {
        email: 'Enter your email address',
        password: 'Enter your password'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters',
        signInError: 'Invalid email or password. Please try again.',
        signInSuccess: 'Welcome back! Signing you in...'
      }
    },
    ar: {
      title: 'أهلاً بعودتك',
      subtitle: 'سجل دخولك إلى حساب بالانس العقارية',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      signIn: 'تسجيل الدخول',
      noAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
      or: 'أو',
      signInWithGoogle: 'تسجيل الدخول بجوجل',
      signInWithGoogleLoading: 'جاري تسجيل الدخول بجوجل...',
      placeholders: {
        email: 'أدخل بريدك الإلكتروني',
        password: 'أدخل كلمة المرور'
      },
      validation: {
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMinLength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        signInError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.',
        signInSuccess: 'أهلاً بعودتك! جاري تسجيل الدخول...'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Real-time validation
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setValidationState(prev => ({
        ...prev,
        email: emailRegex.test(value)
      }));
    }

    if (name === 'password') {
      setValidationState(prev => ({
        ...prev,
        password: value.length >= 6
      }));
    }
  };

  const validateForm = (): boolean => {
    return validationState.email && validationState.password;
  };

  const isFormValid = validateForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    try {
      await login({ 
        email: formData.email, 
        password: formData.password 
      });
      
      // Get redirect path from location state or default to profile
      const from = location.state?.from || '/profile';
      navigate(from, { replace: true });

    } catch {
      // AuthContext will handle the error toast
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    if (provider === 'google') {
      try {
        // Set loading state
        setGoogleLoading(true);
        
        // Reset any previous state
        googleAuthService.reset();
        
        // Use the actual Google OAuth service
        const idToken = await googleAuthService.signInWithPopup();
        
        // Send the ID token to the backend
        await googleLogin({ idToken });
        
        // Get redirect path from location state or default to profile
        const from = location.state?.from || '/profile';
        navigate(from, { replace: true });
        
      } catch (error) {
        console.error('Google login error:', error);
        
        // Reset service state on error
        googleAuthService.reset();
        
        // Show user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (errorMessage.includes('timeout') || errorMessage.includes('dismissed') || errorMessage.includes('cancelled')) {
          // Don't show toast for user cancellations
          return;
        }
        
        if (errorMessage.includes('Client ID') || errorMessage.includes('invalid_client')) {
          // Configuration error - show alert for developers
          alert(isArabic 
            ? 'خطأ في إعداد Google OAuth. يرجى التحقق من Google Client ID في ملف .env' 
            : 'Google OAuth configuration error. Please check Google Client ID in .env file'
          );
          return;
        }
        
        // AuthContext will handle the error toast for API errors
        // For Google service errors, we handle them here
        if (errorMessage.includes('Failed to')) {
          // This is a Google service error, not an API error
          // You could show a toast here if needed
        }
      } finally {
        // Always clear loading state
        setGoogleLoading(false);
      }
    }
  };

  return (
    <div className={styles.signin} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.signin__container}>
        <div className={styles.signin__form_section}>
          <div className={styles.signin__header}>
            <h1 className={styles.signin__title}>{t.title}</h1>
            <p className={styles.signin__subtitle}>{t.subtitle}</p>
          </div>

          <form className={styles.signin__form} onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.signin__form_group}>
              <label className={styles.signin__label}>{t.email}</label>
              <div className={styles.signin__input_wrapper}>
                <Mail className={styles.signin__input_icon} size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.email}
                  className={`${styles.signin__input} ${
                    formData.email ? 
                      (validationState.email ? styles.signin__input_valid : styles.signin__input_invalid) : 
                      ''
                  }`}
                  disabled={loading}
                />
              </div>
              {formData.email && (
                <div 
                  className={`${styles.signin__email_hint} ${
                    validationState.email ? 'valid' : 'invalid'
                  }`}
                >
                  {validationState.email ? (
                    isArabic ? '✓ تنسيق البريد الإلكتروني صحيح' : '✓ Valid email format'
                  ) : (
                    isArabic ? '✗ تنسيق البريد الإلكتروني غير صحيح' : '✗ Invalid email format'
                  )}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.signin__form_group}>
              <label className={styles.signin__label}>{t.password}</label>
              <div className={styles.signin__input_wrapper}>
                <Lock className={styles.signin__input_icon} size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.password}
                  className={`${styles.signin__input} ${
                    formData.password ? 
                      (validationState.password ? styles.signin__input_valid : styles.signin__input_invalid) : 
                      ''
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.signin__password_toggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.password && (
                <div 
                  className={`${styles.signin__password_hint} ${
                    validationState.password ? 'valid' : 'invalid'
                  }`}
                >
                  {validationState.password ? (
                    isArabic ? '✓ كلمة المرور مقبولة' : '✓ Password accepted'
                  ) : (
                    isArabic ? '✗ كلمة المرور يجب أن تكون 6 أحرف على الأقل' : '✗ Password must be at least 6 characters'
                  )}
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={styles.signin__form_options}>
              <label className={styles.signin__checkbox}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span className={styles.signin__checkbox_text}>{t.rememberMe}</span>
              </label>
              <Link to="/forgot-password" className={styles.signin__forgot_link}>
                {t.forgotPassword}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${styles.signin__submit_btn} ${
                (!isFormValid || loading) ? styles.signin__submit_btn_disabled : ''
              }`}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <div className={styles.signin__loading}>
                  <div className={styles.signin__spinner}></div>
                  {isArabic ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                </div>
              ) : (
                t.signIn
              )}
            </button>

            {/* Divider */}
            <div className={styles.signin__divider}>
              <span>{t.or}</span>
            </div>

            {/* Social Login */}
            <div className={styles.signin__social}>
              <button
                type="button"
                className={`${styles.signin__social_btn} ${styles.signin__google_btn}`}
                onClick={() => handleSocialLogin('google')}
                disabled={loading || googleLoading}
              >
                <img src="/images/google-icon.svg" alt="Google" />
                {googleLoading ? (
                  <span className={styles.signin__loading_text}>
                    {t.signInWithGoogleLoading}
                  </span>
                ) : (
                  t.signInWithGoogle
                )}
                {googleLoading && <div className={styles.signin__spinner_small}></div>}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className={styles.signin__signup_link}>
              <span>{t.noAccount}</span>
              <Link to="/signup" className={styles.signin__link}>
                {t.signUp}
              </Link>
            </div>
          </form>
        </div>

        {/* Background Image Section */}
        <div className={styles.signin__image_section}>
          <div className={styles.signin__image_content}>
            <img src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350813/4963_txeqoe.jpg" alt="Balance Real Estate" />
            <div className={styles.signin__image_overlay}>
              <h2>{isArabic ? 'اكتشف عقارك المثالي' : 'Discover Your Perfect Property'}</h2>
              <p>{isArabic ? 'مع بالانس العقارية، ابحث عن منزل أحلامك' : 'With Balance Real Estate, find your dream home'}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
};

export default SignInPage;
