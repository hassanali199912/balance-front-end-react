import React from 'react';
import styles from '../../../styles/components/common/LoadingSpinner.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text, 
  size = 'medium',
  overlay = false 
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      defaultText: 'Loading...',
      projectDetails: 'Loading Project Details...'
    },
    ar: {
      defaultText: 'جاري التحميل...',
      projectDetails: 'جاري تحميل تفاصيل المشروع...'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const displayText = text || t.defaultText;

  return (
    <div className={`${styles.loading} ${overlay ? styles.loading__overlay : ''} ${styles[`loading__${size}`]}`} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.loading__container}>
        <div className={styles.loading__spinner}>
          <div className={styles.loading__circle}></div>
          <div className={styles.loading__circle}></div>
          <div className={styles.loading__circle}></div>
        </div>
        <div className={styles.loading__text}>{displayText}</div>
        <div className={styles.loading__progress}>
          <div className={styles.loading__progress_bar}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
