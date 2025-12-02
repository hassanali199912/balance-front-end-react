import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import styles from '../../styles/components/Toast.module.css';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 4000
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      const timer = setTimeout(() => {
        setIsShowing(false);
        setTimeout(onClose, 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsShowing(false);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className={styles.icon} />;
      case 'error':
        return <XCircle className={styles.icon} />;
      case 'info':
        return <AlertCircle className={styles.icon} />;
      default:
        return <AlertCircle className={styles.icon} />;
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[type]} ${isShowing ? styles.show : styles.hide}`}>
      <div className={styles.content}>
        {getIcon()}
        <span className={styles.message}>{message}</span>
        <button 
          className={styles.closeButton}
          onClick={() => {
            setIsShowing(false);
            setTimeout(onClose, 300);
          }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
