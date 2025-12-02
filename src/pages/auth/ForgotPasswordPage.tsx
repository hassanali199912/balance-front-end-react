import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage, useAuth } from '../../contexts';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import styles from '../../styles/components/auth/ForgotPassword.module.css';

const ForgotPasswordPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const content = {
    en: {
      title: 'Forgot Password?',
      subtitle: 'Enter your email address and we\'ll send you a link to reset your password',
      email: 'Email Address',
      sendLink: 'Send Reset Link',
      backToSignIn: 'Back to Sign In',
      emailSentTitle: 'Check Your Email',
      emailSentMessage: 'We\'ve sent a password reset link to your email address',
      resendLink: 'Resend Link',
      placeholders: {
        email: 'Enter your email address'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        emailNotFound: 'No account found with this email address',
        linkSent: 'Password reset link sent successfully',
        sendError: 'Failed to send reset link. Please try again.'
      }
    },
    ar: {
      title: 'نسيت كلمة المرور؟',
      subtitle: 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور',
      email: 'البريد الإلكتروني',
      sendLink: 'إرسال رابط إعادة التعيين',
      backToSignIn: 'العودة لتسجيل الدخول',
      emailSentTitle: 'تحقق من بريدك الإلكتروني',
      emailSentMessage: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
      resendLink: 'إعادة إرسال الرابط',
      placeholders: {
        email: 'أدخل بريدك الإلكتروني'
      },
      validation: {
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        emailNotFound: 'لم يتم العثور على حساب بهذا البريد الإلكتروني',
        linkSent: 'تم إرسال رابط إعادة تعيين كلمة المرور بنجاح',
        sendError: 'فشل في إرسال الرابط. يرجى المحاولة مرة أخرى.'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const validateEmail = (email: string): boolean => {
    if (!email) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) return;

    setLoading(true);
    try {
      await forgotPassword(email);
      setEmailSent(true);
    } catch {
      // Error is handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!validateEmail(email)) return;

    try {
      await forgotPassword(email);
    } catch {
      // Error is handled by AuthContext
    }
  };

  if (emailSent) {
    return (
      <div className={styles.forgotPassword} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={styles.forgotPassword__container}>
          <div className={styles.forgotPassword__content}>
            {/* Success Header */}
            <div className={styles.forgotPassword__header}>
              <div className={styles.forgotPassword__success_icon}>
                <CheckCircle size={48} />
              </div>
              <h1 className={styles.forgotPassword__title}>
                {t.emailSentTitle}
              </h1>
              <p className={styles.forgotPassword__subtitle}>
                {t.emailSentMessage}
              </p>
            </div>
            
            {/* Actions */}
            <div className={styles.forgotPassword__actions}>
              <button
                onClick={handleResend}
                className={styles.forgotPassword__resend_btn}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : t.resendLink}
              </button>
              
              <Link 
                to="/signin" 
                className={styles.forgotPassword__back_btn}
              >
                <ArrowLeft size={18} />
                {t.backToSignIn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.forgotPassword} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.forgotPassword__container}>
        <div className={styles.forgotPassword__content}>
          {/* Header */}
          <div className={styles.forgotPassword__header}>
            <div className={styles.forgotPassword__icon}>
              <Mail size={32} />
            </div>
            <h1 className={styles.forgotPassword__title}>
              {t.title}
            </h1>
            <p className={styles.forgotPassword__subtitle}>
              {t.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.forgotPassword__form}>
            <div className={styles.forgotPassword__form_group}>
              <label className={styles.forgotPassword__label}>
                {t.email}
              </label>
              <div className={styles.forgotPassword__input_wrapper}>
                <Mail className={styles.forgotPassword__input_icon} size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholders.email}
                  className={styles.forgotPassword__input}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.forgotPassword__submit_btn}
              disabled={loading || !validateEmail(email)}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                t.sendLink
              )}
            </button>

            {/* Back to Sign In */}
            <Link 
              to="/signin" 
              className={styles.forgotPassword__back_btn}
            >
              <ArrowLeft size={18} />
              {t.backToSignIn}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
