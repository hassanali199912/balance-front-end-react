import React from 'react';
import { Heart, X } from 'lucide-react';
import styles from '../../../styles/components/common/Toast.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  icon?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 3000,
  icon 
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const defaultIcon = type === 'success' ? <Heart size={20} /> : null;

  return (
    <div 
      className={`${styles.toast} ${styles[`toast__${type}`]} ${isVisible ? styles.toast__visible : ''}`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className={styles.toast__content}>
        {(icon || defaultIcon) && (
          <div className={styles.toast__icon}>
            {icon || defaultIcon}
          </div>
        )}
        <span className={styles.toast__message}>{message}</span>
      </div>
      <button 
        className={styles.toast__close}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
