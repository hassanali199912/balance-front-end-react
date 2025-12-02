import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import styles from '../../../styles/components/projects/Breadcrumb.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  title: string;
  description: string;
  backgroundImage?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  title, 
  description, 
  backgroundImage = '/public/assets/breadcrumb-bg.jpg' 
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  return (
    <section className={styles.breadcrumb} dir={isArabic ? 'rtl' : 'ltr'}>
      <div 
        className={styles.breadcrumb__background}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={styles.breadcrumb__overlay} />
      
      <div className={styles.breadcrumb__container}>
        {/* Navigation */}
        <nav className={styles.breadcrumb__nav}>
          <ol className={styles.breadcrumb__list}>
            {items.map((item, index) => (
              <li key={index} className={styles.breadcrumb__item}>
                {item.href ? (
                  <Link to={item.href} className={styles.breadcrumb__link}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumb__current}>
                    {item.label}
                  </span>
                )}
                {index < items.length - 1 && (
                  <span className={styles.breadcrumb__separator}>
                    {isArabic ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className={styles.breadcrumb__content}>
          <h1 className={styles.breadcrumb__title}>
            {title}
          </h1>
          <p className={styles.breadcrumb__description}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
