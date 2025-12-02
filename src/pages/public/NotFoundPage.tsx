import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import styles from '../../styles/pages/NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      title: '404 - Page Not Found',
      subtitle: 'Oops! The page you are looking for doesn\'t exist.',
      description: 'The page you are trying to access might have been moved, deleted, or you entered the wrong URL.',
      backHome: 'Back to Home',
      browseProjects: 'Browse Projects',
      contactUs: 'Contact Us'
    },
    ar: {
      title: '404 - الصفحة غير موجودة',
      subtitle: 'عذراً! الصفحة التي تبحث عنها غير موجودة.',
      description: 'الصفحة التي تحاول الوصول إليها ربما تم نقلها أو حذفها، أو أنك أدخلت رابطاً خاطئاً.',
      backHome: 'العودة للرئيسية',
      browseProjects: 'تصفح المشاريع',
      contactUs: 'اتصل بنا'
    }
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <div className={styles.notFound} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.notFound__container}>
        <div className={styles.notFound__content}>
          {/* 404 Number */}
          <div className={styles.notFound__number}>
            404
          </div>

          {/* Title */}
          <h1 className={styles.notFound__title}>
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className={styles.notFound__subtitle}>
            {t.subtitle}
          </p>

          {/* Description */}
          <p className={styles.notFound__description}>
            {t.description}
          </p>

          {/* Action Buttons */}
          <div className={styles.notFound__actions}>
            <Link to="/" className={styles.notFound__button_primary}>
              <Home className={styles.notFound__buttonIcon} />
              {t.backHome}
              {isArabic ? <ArrowLeft className={styles.notFound__buttonArrow} /> : <ArrowRight className={styles.notFound__buttonArrow} />}
            </Link>

            <Link to="/projects" className={styles.notFound__button_secondary}>
              {t.browseProjects}
            </Link>

            <Link to="/contact" className={styles.notFound__button_secondary}>
              {t.contactUs}
            </Link>
          </div>
        </div>

        {/* Decorative Image */}
        <div className={styles.notFound__image}>
          <img 
            src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&crop=center"
            alt="404 Not Found"
            className={styles.notFound__img}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
