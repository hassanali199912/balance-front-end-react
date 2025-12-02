import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useLanguage, useAuth } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import styles from '../../styles/components/auth/ResetPassword.module.css';

const ResetPasswordPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  
  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumbers: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  const { resetPassword } = useAuth();

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    const emailFromUrl = searchParams.get('email');
    
    if (!tokenFromUrl || !emailFromUrl) {
      navigate('/signin');
      return;
    }
    
    setToken(tokenFromUrl);
    // فك تشفير البريد الإلكتروني من URL encoding
    setEmail(decodeURIComponent(emailFromUrl));
  }, [searchParams, navigate]);

  const content = {
    en: {
      title: 'Reset Your Password',
      subtitle: 'Enter your new password below',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      resetPassword: 'Reset Password',
      backToSignIn: 'Back to Sign In',
      passwordRequirements: 'Password Requirements',
      success: 'Password reset successfully! Redirecting to sign in...',
      placeholders: {
        newPassword: 'Enter your new password',
        confirmPassword: 'Confirm your new password'
      },
      hints: {
        minLength: 'At least 8 characters',
        uppercase: 'At least one uppercase letter (A-Z)',
        lowercase: 'At least one lowercase letter (a-z)',
        numbers: 'At least one number (0-9)',
        specialChar: 'At least one special character (!@#$%^&*)',
        passwordsMatch: 'Passwords match'
      },
      errors: {
        invalidToken: 'Invalid or expired reset token',
        passwordRequired: 'Password is required',
        passwordsNotMatch: 'Passwords do not match',
        resetFailed: 'Failed to reset password. Please try again.'
      }
    },
    ar: {
      title: 'إعادة تعيين كلمة المرور',
      subtitle: 'أدخل كلمة المرور الجديدة أدناه',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور',
      resetPassword: 'إعادة تعيين كلمة المرور',
      backToSignIn: 'العودة لتسجيل الدخول',
      passwordRequirements: 'متطلبات كلمة المرور',
      success: 'تم إعادة تعيين كلمة المرور بنجاح! جاري التوجيه لتسجيل الدخول...',
      placeholders: {
        newPassword: 'أدخل كلمة المرور الجديدة',
        confirmPassword: 'أكد كلمة المرور الجديدة'
      },
      hints: {
        minLength: 'على الأقل 8 أحرف',
        uppercase: 'حرف كبير واحد على الأقل (A-Z)',
        lowercase: 'حرف صغير واحد على الأقل (a-z)',
        numbers: 'رقم واحد على الأقل (0-9)',
        specialChar: 'رمز خاص واحد على الأقل (!@#$%^&*)',
        passwordsMatch: 'كلمات المرور متطابقة'
      },
      errors: {
        invalidToken: 'رمز إعادة التعيين غير صحيح أو منتهي الصلاحية',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordsNotMatch: 'كلمات المرور غير متطابقة',
        resetFailed: 'فشل في إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى.'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time password validation
    if (name === 'password' || name === 'confirmPassword') {
      const currentPassword = name === 'password' ? value : formData.password;
      const currentConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      setPasswordValidation({
        hasMinLength: currentPassword.length >= 8,
        hasUpperCase: /[A-Z]/.test(currentPassword),
        hasLowerCase: /[a-z]/.test(currentPassword),
        hasNumbers: /\d/.test(currentPassword),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(currentPassword),
        passwordsMatch: currentPassword === currentConfirmPassword && currentPassword.length > 0
      });
    }
  };

  const validateForm = (): boolean => {
    if (!formData.password) {
      return false;
    }

    if (!passwordValidation.hasMinLength || !passwordValidation.hasUpperCase || 
        !passwordValidation.hasLowerCase || !passwordValidation.hasNumbers || 
        !passwordValidation.hasSpecialChar) {
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !token || !email) return;

    setLoading(true);
    try {
      await resetPassword({
        email,
        token,
        newPassword: formData.password
      });
      
      // Redirect to signin page after successful reset
      setTimeout(() => {
        navigate('/signin');
      }, 2000);

    } catch {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.resetPassword} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.resetPassword__container}>
        <div className={styles.resetPassword__content}>
          {/* Header */}
          <div className={styles.resetPassword__header}>
            <div className={styles.resetPassword__icon}>
              <Lock size={32} />
            </div>
            <h1 className={styles.resetPassword__title}>
              {t.title}
            </h1>
            <p className={styles.resetPassword__subtitle}>
              {t.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.resetPassword__form}>
            {/* New Password Field */}
            <div className={styles.resetPassword__form_group}>
              <label className={styles.resetPassword__label}>
                {t.newPassword}
              </label>
              <div className={styles.resetPassword__input_wrapper}>
                <Lock className={styles.resetPassword__input_icon} size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.newPassword}
                  className={styles.resetPassword__input}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className={styles.resetPassword__password_toggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Strength Hints */}
              {formData.password && (
                <div className={styles.resetPassword__password_hints}>
                  <div className={styles.resetPassword__hints_grid}>
                    <div className={`${styles.resetPassword__hint} ${passwordValidation.hasMinLength ? styles.resetPassword__hint_valid : styles.resetPassword__hint_invalid}`}>
                      <span className={styles.resetPassword__hint_icon}>
                        {passwordValidation.hasMinLength ? '✓' : '✗'}
                      </span>
                      {t.hints.minLength}
                    </div>
                    <div className={`${styles.resetPassword__hint} ${passwordValidation.hasUpperCase ? styles.resetPassword__hint_valid : styles.resetPassword__hint_invalid}`}>
                      <span className={styles.resetPassword__hint_icon}>
                        {passwordValidation.hasUpperCase ? '✓' : '✗'}
                      </span>
                      {t.hints.uppercase}
                    </div>
                    <div className={`${styles.resetPassword__hint} ${passwordValidation.hasLowerCase ? styles.resetPassword__hint_valid : styles.resetPassword__hint_invalid}`}>
                      <span className={styles.resetPassword__hint_icon}>
                        {passwordValidation.hasLowerCase ? '✓' : '✗'}
                      </span>
                      {t.hints.lowercase}
                    </div>
                    <div className={`${styles.resetPassword__hint} ${passwordValidation.hasNumbers ? styles.resetPassword__hint_valid : styles.resetPassword__hint_invalid}`}>
                      <span className={styles.resetPassword__hint_icon}>
                        {passwordValidation.hasNumbers ? '✓' : '✗'}
                      </span>
                      {t.hints.numbers}
                    </div>
                    <div className={`${styles.resetPassword__hint} ${passwordValidation.hasSpecialChar ? styles.resetPassword__hint_valid : styles.resetPassword__hint_invalid}`}>
                      <span className={styles.resetPassword__hint_icon}>
                        {passwordValidation.hasSpecialChar ? '✓' : '✗'}
                      </span>
                      {t.hints.specialChar}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.resetPassword__form_group}>
              <label className={styles.resetPassword__label}>
                {t.confirmPassword}
              </label>
              <div className={styles.resetPassword__input_wrapper}>
                <Lock className={styles.resetPassword__input_icon} size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.confirmPassword}
                  className={styles.resetPassword__input}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className={styles.resetPassword__password_toggle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div 
                  className={`${styles.resetPassword__password_match} ${
                    passwordValidation.passwordsMatch ? styles.resetPassword__password_match_valid : styles.resetPassword__password_match_invalid
                  }`}
                >
                  <span className={styles.resetPassword__match_icon}>
                    {passwordValidation.passwordsMatch ? '✓' : '✗'}
                  </span>
                  {passwordValidation.passwordsMatch ? t.hints.passwordsMatch : t.errors.passwordsNotMatch}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.resetPassword__submit_btn}
              disabled={loading || !validateForm()}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                t.resetPassword
              )}
            </button>

            {/* Back to Sign In */}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className={styles.resetPassword__back_btn}
              disabled={loading}
            >
              <ArrowLeft size={18} />
              {t.backToSignIn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
