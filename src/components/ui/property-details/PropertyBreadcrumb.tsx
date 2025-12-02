import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/components/property-details/PropertyBreadcrumb.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PropertyBreadcrumbProps {
  propertyName: string;
  propertyNameAr: string;
  location: string;
  locationAr: string;
  backgroundImage: string;
  propertyType: string;
  propertyTypeAr: string;
}

const PropertyBreadcrumb: React.FC<PropertyBreadcrumbProps> = ({
  propertyName,
  propertyNameAr,
  location,
  locationAr,
  backgroundImage,
  propertyType,
  propertyTypeAr
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      home: 'Home',
      properties: 'Properties',
      propertyDetails: 'Property Details'
    },
    ar: {
      home: 'الرئيسية',
      properties: 'العقارات',
      propertyDetails: 'تفاصيل العقار'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentPropertyName = isArabic ? propertyNameAr : propertyName;
  const currentLocation = isArabic ? locationAr : location;
  const currentType = isArabic ? propertyTypeAr : propertyType;

  return (
    <section 
      className={styles.breadcrumb}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className={styles.breadcrumb__overlay}></div>
      <div className={styles.breadcrumb__container}>
        <nav className={styles.breadcrumb__nav}>
          <Link to="/" className={styles.breadcrumb__link}>
            <Home size={16} />
            {t.home}
          </Link>
          <ChevronRight size={16} className={styles.breadcrumb__separator} />
          <Link to="/properties" className={styles.breadcrumb__link}>
            {t.properties}
          </Link>
          <ChevronRight size={16} className={styles.breadcrumb__separator} />
          <span className={styles.breadcrumb__current}>
            {t.propertyDetails}
          </span>
        </nav>
        
        <div className={styles.breadcrumb__content}>
          <div className={styles.breadcrumb__badge}>
            {currentType}
          </div>
          <h1 className={styles.breadcrumb__title}>
            {currentPropertyName}
          </h1>
          <p className={styles.breadcrumb__location}>
            {currentLocation}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PropertyBreadcrumb;
