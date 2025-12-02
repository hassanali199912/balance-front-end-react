import React from 'react';
import styles from '../../styles/components/common/LoadingSpinner.module.css';
import { useLanguage } from '../../contexts/useLanguage';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen = false,
  size = 'medium',
  text
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      loading: text || 'Loading...'
    },
    ar: {
      loading: text || 'جارٍ التحميل...'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const containerClass = fullScreen
    ? `${styles.loading} ${styles.loading__overlay}`
    : styles.loading;

  const spinnerSize = {
    small: styles.loading__spinner_small,
    medium: styles.loading__spinner_medium,
    large: styles.loading__spinner_large
  };

  return (
    <div className={containerClass} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.loading__container}>
        <div className={`${styles.loading__spinner} ${spinnerSize[size]}`}>
          <div className={styles.loading__circle}></div>
          <div className={styles.loading__circle}></div>
          <div className={styles.loading__circle}></div>
        </div>
        <p className={styles.loading__text}>{t.loading}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
