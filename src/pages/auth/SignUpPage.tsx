import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useLanguage, useAuth } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Modal from '../../components/ui/Modal';
import TermsOfServiceContent from '../../components/ui/TermsOfServiceContent';
import PrivacyPolicyContent from '../../components/ui/PrivacyPolicyContent';
import googleAuthService from '../../services/googleAuth';
import styles from '../../styles/components/auth/SignUp.module.css';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeToNewsletter: boolean;
}

const SignUpPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeToNewsletter: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { register, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  
  // Loading state for Google OAuth
  const [googleLoading, setGoogleLoading] = useState(false);
  
  // Validation states for real-time feedback
  const [validationState, setValidationState] = useState({
    firstName: { isValid: false, isEmpty: true },
    lastName: { isValid: false, isEmpty: true },
    email: { isValid: false, isEmpty: true },
    phone: { isValid: false, isEmpty: true },
    password: {
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
      hasSpecial: false,
      passwordsMatch: false
    },
    agreeToTerms: false
  });

  const content = {
    en: {
      title: 'Create Your Account',
      subtitle: 'Join Balance Real Estate to discover amazing properties',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      agreeToTerms: 'I agree to the Terms of Service and Privacy Policy',
      subscribeToNewsletter: 'Subscribe to our newsletter for property updates',
      signUp: 'Create Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
      or: 'Or',
      signUpWithGoogle: 'Sign up with Google',
      signUpWithGoogleLoading: 'Creating account with Google...',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      placeholders: {
        firstName: 'Enter your first name',
        lastName: 'Enter your last name',
        email: 'example@domain.com',
        phone: '+966501234567',
        password: 'Create a strong password',
        confirmPassword: 'Confirm your password'
      },
      validation: {
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 8 characters',
        passwordMatch: 'Passwords do not match',
        termsRequired: 'You must agree to the terms and conditions',
        signUpError: 'Something went wrong. Please try again.',
        emailExists: 'An account with this email already exists.',
        signUpSuccess: 'Account created successfully! Please check your email to verify your account.'
      },
      passwordHints: {
        title: 'Password Requirements:',
        minLength: 'At least 8 characters',
        hasUppercase: 'At least one uppercase letter (A-Z)',
        hasLowercase: 'At least one lowercase letter (a-z)',
        hasNumber: 'At least one number (0-9)',
        hasSpecial: 'At least one special character (!@#$%^&*)',
        passwordsMatch: 'Passwords match'
      }
    },
    ar: {
      title: 'إنشاء حسابك',
      subtitle: 'انضم إلى بالانس العقارية لاكتشاف عقارات مذهلة',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      agreeToTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      subscribeToNewsletter: 'اشترك في نشرتنا الإخبارية لتحديثات العقارات',
      signUp: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      or: 'أو',
      signUpWithGoogle: 'إنشاء حساب بجوجل',
      signUpWithGoogleLoading: 'جاري فتح جوجل...',
      termsOfService: 'شروط الخدمة',
      privacyPolicy: 'سياسة الخصوصية',
      placeholders: {
        firstName: 'أدخل اسمك الأول',
        lastName: 'أدخل اسم العائلة',
        email: 'example@domain.com',
        phone: '+966501234567',
        password: 'أنشئ كلمة مرور قوية',
        confirmPassword: 'أكد كلمة المرور'
      },
      validation: {
        firstNameRequired: 'الاسم الأول مطلوب',
        lastNameRequired: 'اسم العائلة مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordMinLength: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
        passwordMatch: 'كلمات المرور غير متطابقة',
        termsRequired: 'يجب الموافقة على الشروط والأحكام',
        signUpError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        emailExists: 'يوجد حساب بهذا البريد الإلكتروني بالفعل.',
        signUpSuccess: 'تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني لتفعيل حسابك.'
      },
      passwordHints: {
        title: 'متطلبات كلمة المرور:',
        minLength: '8 أحرف على الأقل',
        hasUppercase: 'حرف كبير واحد على الأقل (A-Z)',
        hasLowercase: 'حرف صغير واحد على الأقل (a-z)',
        hasNumber: 'رقم واحد على الأقل (0-9)',
        hasSpecial: 'رمز خاص واحد على الأقل (!@#$%^&*)',
        passwordsMatch: 'كلمات المرور متطابقة'
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
    if (name === 'firstName') {
      setValidationState(prev => ({
        ...prev,
        firstName: {
          isValid: value.trim().length >= 2,
          isEmpty: value.trim() === ''
        }
      }));
    }

    if (name === 'lastName') {
      setValidationState(prev => ({
        ...prev,
        lastName: {
          isValid: value.trim().length >= 2,
          isEmpty: value.trim() === ''
        }
      }));
    }

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setValidationState(prev => ({
        ...prev,
        email: {
          isValid: emailRegex.test(value),
          isEmpty: value.trim() === ''
        }
      }));
    }

    if (name === 'phone') {
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      setValidationState(prev => ({
        ...prev,
        phone: {
          isValid: phoneRegex.test(value.replace(/\s/g, '')),
          isEmpty: value.trim() === ''
        }
      }));
    }

    if (name === 'password' || name === 'confirmPassword') {
      const currentPassword = name === 'password' ? value : formData.password;
      const currentConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      setValidationState(prev => ({
        ...prev,
        password: {
          minLength: currentPassword.length >= 8,
          hasUppercase: /[A-Z]/.test(currentPassword),
          hasLowercase: /[a-z]/.test(currentPassword),
          hasNumber: /\d/.test(currentPassword),
          hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(currentPassword),
          passwordsMatch: currentPassword === currentConfirmPassword && currentPassword.length > 0
        }
      }));
    }

    if (name === 'agreeToTerms') {
      setValidationState(prev => ({
        ...prev,
        agreeToTerms: checked
      }));
    }
  };

  const validateForm = (): boolean => {
    return validationState.firstName.isValid &&
           validationState.lastName.isValid &&
           validationState.email.isValid &&
           validationState.phone.isValid &&
           validationState.password.minLength &&
           validationState.password.hasUppercase &&
           validationState.password.hasLowercase &&
           validationState.password.hasNumber &&
           validationState.password.hasSpecial &&
           validationState.password.passwordsMatch &&
           validationState.agreeToTerms;
  };

  const isFormValid = validateForm();

  const openTermsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPrivacyModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    try {
      // Get user's public IP (optional)
      let publicIp = '';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        publicIp = ipData.ip;
      } catch {
        // IP fetch failed, continue without it
      }

      await register({
        userName: formData.email, // Use email as userName as per API docs
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        PublicIp: publicIp
      });
      
      // Redirect to signin page after successful registration
      setTimeout(() => {
        navigate('/signin');
      }, 2000);

    } catch {
      // Error is handled by the AuthContext
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'facebook') => {
    if (provider === 'google') {
      setGoogleLoading(true);
      try {
        // Reset any previous state
        googleAuthService.reset();
        
        // Use the actual Google OAuth service
        const idToken = await googleAuthService.signInWithPopup();
        
        // Send the ID token to the backend (handles both login and registration)
        await googleLogin({ idToken });
        
        // Redirect to profile page after successful registration/login
        navigate('/profile');
        
      } catch (error) {
        console.error('Google signup error:', error);
        
        // Reset service state on error
        googleAuthService.reset();
        
        // Show user-friendly error message
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('timeout') || errorMessage.includes('dismissed')) {
          // Don't show toast for user cancellations
          return;
        }
        
        // AuthContext will handle API errors
      } finally {
        setGoogleLoading(false);
      }
    }
  };

  return (
    <div className={styles.signup} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.signup__container}>
        <div className={styles.signup__form_section}>
          <div className={styles.signup__header}>
            <h1 className={styles.signup__title}>{t.title}</h1>
            <p className={styles.signup__subtitle}>{t.subtitle}</p>
          </div>

          <form className={styles.signup__form} onSubmit={handleSubmit}>
            {/* Name Fields */}
            <div className={styles.signup__form_row}>
              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.firstName}</label>
                <div className={styles.signup__input_wrapper}>
                  <User className={styles.signup__input_icon} size={20} />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.firstName}
                    className={`${styles.signup__input} ${
                      formData.firstName ? 
                        (validationState.firstName.isValid ? 
                         styles.signup__input_valid : styles.signup__input_invalid) 
                        : ''
                    }`}
                    disabled={loading}
                  />
                </div>
                {formData.firstName && (
                  <div 
                    className={`${styles.signup__name_hint} ${
                      validationState.firstName.isValid ? 'valid' : 'invalid'
                    }`}
                  >
                    {validationState.firstName.isValid ? (
                      isArabic ? '✓ الاسم الأول صحيح' : '✓ Valid first name'
                    ) : (
                      isArabic ? '✗ الاسم الأول مطلوب (حرفين على الأقل)' : '✗ First name required (at least 2 characters)'
                    )}
                  </div>
                )}
              </div>

              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.lastName}</label>
                <div className={styles.signup__input_wrapper}>
                  <User className={styles.signup__input_icon} size={20} />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.lastName}
                    className={`${styles.signup__input} ${
                      formData.lastName ? 
                        (validationState.lastName.isValid ? 
                         styles.signup__input_valid : styles.signup__input_invalid) 
                        : ''
                    }`}
                    disabled={loading}
                  />
                </div>
                {formData.lastName && (
                  <div 
                    className={`${styles.signup__name_hint} ${
                      validationState.lastName.isValid ? 'valid' : 'invalid'
                    }`}
                  >
                    {validationState.lastName.isValid ? (
                      isArabic ? '✓ اسم العائلة صحيح' : '✓ Valid last name'
                    ) : (
                      isArabic ? '✗ اسم العائلة مطلوب (حرفين على الأقل)' : '✗ Last name required (at least 2 characters)'
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className={styles.signup__form_group}>
              <label className={styles.signup__label}>{t.email}</label>
              <div className={styles.signup__input_wrapper}>
                <Mail className={styles.signup__input_icon} size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.email}
                  className={`${styles.signup__input} ${
                    formData.email ? 
                      (validationState.email.isValid ? 
                       styles.signup__input_valid : styles.signup__input_invalid) 
                      : ''
                  }`}
                  disabled={loading}
                />
              </div>
              <div 
                className={`${styles.signup__email_hint} ${
                  validationState.email.isEmpty 
                    ? '' 
                    : validationState.email.isValid 
                      ? 'valid' 
                      : 'invalid'
                }`}
              >
                {validationState.email.isEmpty ? (
                  isArabic ? 'مثال: example@domain.com' : 'Example: example@domain.com'
                ) : validationState.email.isValid ? (
                  isArabic ? '✓ تنسيق البريد الإلكتروني صحيح' : '✓ Valid email format'
                ) : (
                  isArabic ? '✗ تنسيق البريد الإلكتروني غير صحيح' : '✗ Invalid email format'
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div className={styles.signup__form_group}>
              <label className={styles.signup__label}>{t.phone}</label>
              <div className={styles.signup__input_wrapper}>
                <Phone className={styles.signup__input_icon} size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.phone}
                  className={`${styles.signup__input} ${
                    formData.phone ? 
                      (validationState.phone.isValid ? 
                       styles.signup__input_valid : styles.signup__input_invalid) 
                      : ''
                  }`}
                  disabled={loading}
                />
              </div>
              <div 
                className={`${styles.signup__phone_hint} ${
                  validationState.phone.isEmpty 
                    ? '' 
                    : validationState.phone.isValid 
                      ? 'valid' 
                      : 'invalid'
                }`}
              >
                {validationState.phone.isEmpty ? (
                  isArabic ? 'يجب أن يبدأ الرقم بـ + ورمز البلد (مثال: +966501234567)' : 'Must start with + and country code (e.g., +966501234567)'
                ) : validationState.phone.isValid ? (
                  isArabic ? '✓ تنسيق رقم الهاتف صحيح' : '✓ Valid phone format'
                ) : (
                  isArabic ? '✗ تنسيق رقم الهاتف غير صحيح' : '✗ Invalid phone format'
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className={styles.signup__form_row}>
              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.password}</label>
                <div className={styles.signup__input_wrapper}>
                  <Lock className={styles.signup__input_icon} size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.password}
                    className={`${styles.signup__input} ${
                      formData.password ? 
                        (validationState.password.minLength && 
                         validationState.password.hasUppercase && 
                         validationState.password.hasLowercase && 
                         validationState.password.hasNumber && 
                         validationState.password.hasSpecial ? 
                         styles.signup__input_valid : styles.signup__input_invalid) 
                        : ''
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.signup__password_toggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className={styles.signup__form_group}>
                <label className={styles.signup__label}>{t.confirmPassword}</label>
                <div className={styles.signup__input_wrapper}>
                  <Lock className={styles.signup__input_icon} size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.confirmPassword}
                    className={`${styles.signup__input} ${
                      formData.confirmPassword ? 
                        (validationState.password.passwordsMatch ? 
                         styles.signup__input_valid : styles.signup__input_invalid) 
                        : ''
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.signup__password_toggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Password Strength Hints - Professional Style */}
            {(formData.password || formData.confirmPassword) && (
              <div className={styles.signup__password_hints_wrapper}>
                <div className={styles.signup__password_hints}>
                  <h4 className={styles.signup__hints_title}>{t.passwordHints.title}</h4>
                  <div className={styles.signup__hints_grid}>
                    <div className={`${styles.signup__hint} ${validationState.password.minLength ? styles.signup__hint_valid : styles.signup__hint_invalid}`}>
                      <span className={styles.signup__hint_icon}>
                        {validationState.password.minLength ? '✓' : '✗'}
                      </span>
                      <span>{t.passwordHints.minLength}</span>
                    </div>
                    <div className={`${styles.signup__hint} ${validationState.password.hasUppercase ? styles.signup__hint_valid : styles.signup__hint_invalid}`}>
                      <span className={styles.signup__hint_icon}>
                        {validationState.password.hasUppercase ? '✓' : '✗'}
                      </span>
                      <span>{t.passwordHints.hasUppercase}</span>
                    </div>
                    <div className={`${styles.signup__hint} ${validationState.password.hasLowercase ? styles.signup__hint_valid : styles.signup__hint_invalid}`}>
                      <span className={styles.signup__hint_icon}>
                        {validationState.password.hasLowercase ? '✓' : '✗'}
                      </span>
                      <span>{t.passwordHints.hasLowercase}</span>
                    </div>
                    <div className={`${styles.signup__hint} ${validationState.password.hasNumber ? styles.signup__hint_valid : styles.signup__hint_invalid}`}>
                      <span className={styles.signup__hint_icon}>
                        {validationState.password.hasNumber ? '✓' : '✗'}
                      </span>
                      <span>{t.passwordHints.hasNumber}</span>
                    </div>
                    <div className={`${styles.signup__hint} ${validationState.password.hasSpecial ? styles.signup__hint_valid : styles.signup__hint_invalid}`}>
                      <span className={styles.signup__hint_icon}>
                        {validationState.password.hasSpecial ? '✓' : '✗'}
                      </span>
                      <span>{t.passwordHints.hasSpecial}</span>
                    </div>
                    {formData.confirmPassword && (
                      <div className={`${styles.signup__hint} ${validationState.password.passwordsMatch ? styles.signup__hint_valid : styles.signup__hint_invalid}`}>
                        <span className={styles.signup__hint_icon}>
                          {validationState.password.passwordsMatch ? '✓' : '✗'}
                        </span>
                        <span>{t.passwordHints.passwordsMatch}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Terms and Newsletter */}
            <div className={styles.signup__checkboxes}>
              <label className={styles.signup__checkbox}>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span className={styles.signup__checkbox_text}>
                  {t.agreeToTerms.split(' ').slice(0, -4).join(' ')}{' '}
                  <button 
                    type="button"
                    onClick={openTermsModal}
                    className={styles.signup__link}
                  >
                    {t.termsOfService}
                  </button>
                  {' '}{isArabic ? 'و' : 'and'}{' '}
                  <button 
                    type="button"
                    onClick={openPrivacyModal}
                    className={styles.signup__link}
                  >
                    {t.privacyPolicy}
                  </button>
                </span>
              </label>

              <label className={styles.signup__checkbox}>
                <input
                  type="checkbox"
                  name="subscribeToNewsletter"
                  checked={formData.subscribeToNewsletter}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span className={styles.signup__checkbox_text}>{t.subscribeToNewsletter}</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${styles.signup__submit_btn} ${!isFormValid ? styles.signup__submit_btn_disabled : ''}`}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <div className={styles.signup__loading}>
                  <div className={styles.signup__spinner}></div>
                  {isArabic ? 'جاري إنشاء الحساب...' : 'Creating account...'}
                </div>
              ) : (
                t.signUp
              )}
            </button>

            {/* Divider */}
            <div className={styles.signup__divider}>
              <span>{t.or}</span>
            </div>

            {/* Social Signup */}
            <div className={styles.signup__social}>
              <button
                type="button"
                className={`${styles.signup__social_btn} ${styles.signup__google_btn}`}
                onClick={() => handleSocialSignUp('google')}
                disabled={loading || googleLoading}
              >
                <img src="/images/google-icon.svg" alt="Google" />
                {googleLoading ? (
                  <>
                    <span className={styles.signin__spinner_small}></span>
                    <span className={styles.signin__loading_text}>{t.signUpWithGoogleLoading}</span>
                  </>
                ) : (
                  t.signUpWithGoogle
                )}
              </button>
            </div>

            {/* Sign In Link */}
            <div className={styles.signup__signin_link}>
              <span>{t.haveAccount}</span>
              <Link to="/signin" className={styles.signup__link}>
                {t.signIn}
              </Link>
            </div>
          </form>
        </div>

        {/* Background Image Section */}
        <div className={styles.signup__image_section}>
          <div className={styles.signup__image_content}>
            <img src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753359141/signupimage_1_snu6qx.jpg" alt="Balance Real Estate" />
            <div className={styles.signup__image_overlay}>
              <h2>{isArabic ? 'ابدأ رحلتك العقارية معنا' : 'Start Your Real Estate Journey'}</h2>
              <p>{isArabic ? 'انضم إلى آلاف العملاء الراضين عن خدماتنا' : 'Join thousands of satisfied customers'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={closeTermsModal}
        title={t.termsOfService}
        maxWidth="800px"
        isArabic={isArabic}
      >
        <TermsOfServiceContent isArabic={isArabic} />
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={showPrivacyModal}
        onClose={closePrivacyModal}
        title={t.privacyPolicy}
        maxWidth="800px"
        isArabic={isArabic}
      >
        <PrivacyPolicyContent isArabic={isArabic} />
      </Modal>
      
      {/* Loading Overlay */}
      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
};

export default SignUpPage;
