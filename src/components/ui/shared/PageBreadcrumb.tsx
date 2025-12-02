import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, MapPin } from 'lucide-react';
import styles from '../../../styles/components/shared/PageBreadcrumb.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PageBreadcrumbProps {
  title?: string | null;
  titleAr?: string | null;
  location?: string | null;
  locationAr?: string | null;
  backgroundImage?: string | null;
  propertyType?: string | null;
  propertyTypeAr?: string | null;
  projectName?: string | null;
  projectNameAr?: string | null;
  projectSlug?: string | null;
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  title,
  titleAr,
  location,
  locationAr,
  backgroundImage,
  propertyType,
  propertyTypeAr,
  projectName,
  projectNameAr,
  projectSlug,
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const routeLocation = useLocation();

  const isProjectsPage = routeLocation.pathname === '/projects';
  const isPropertyDetailsPage = routeLocation.pathname.includes('/properties/');
  const isProjectDetailsPage =
    routeLocation.pathname.includes('/projects/') && !isProjectsPage;

  const content = {
    en: {
      home: 'Home',
      projects: 'Projects',
      properties: 'Properties',
      projectDetails: 'Project Details',
      propertyDetails: 'Property Details',
      unknown: 'Unknown',
    },
    ar: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      properties: 'العقارات',
      projectDetails: 'تفاصيل المشروع',
      propertyDetails: 'تفاصيل العقار',
      unknown: 'غير محدد',
    },
  };

  const t = isArabic ? content.ar : content.en;

  const getCurrentPageTitle = () => {
    if (isProjectsPage) return t.projects;
    if (isProjectDetailsPage) return t.projectDetails;
    if (isPropertyDetailsPage) return t.propertyDetails;
    return (isArabic ? titleAr : title) || t.unknown;
  };

  const safeTitle = (isArabic ? titleAr : title) || t.unknown;
  const safeProjectName = (isArabic ? projectNameAr : projectName) || t.unknown;
  const safePropertyType = (isArabic ? propertyTypeAr : propertyType) || '';
  const safeLocation = (isArabic ? locationAr : location) || '';

  const getBreadcrumbNavigation = () => {
    const homeLink = (
      <Link to="/" className={styles.breadcrumb__link}>
        <Home size={16} />
        {t.home}
      </Link>
    );

    const separator = (
      <ChevronRight size={16} className={styles.breadcrumb__separator} />
    );

    if (isProjectsPage) {
      return (
        <>
          {homeLink}
          {separator}
          <span className={styles.breadcrumb__current}>{t.projects}</span>
        </>
      );
    }

    if (isProjectDetailsPage) {
      return (
        <>
          {homeLink}
          {separator}
          <Link to="/projects" className={styles.breadcrumb__link}>
            {t.projects}
          </Link>
          {separator}
          <span className={styles.breadcrumb__current}>{t.projectDetails}</span>
        </>
      );
    }

    if (isPropertyDetailsPage) {
      if (projectName && projectSlug) {
        return (
          <>
            {homeLink}
            {separator}
            <Link to="/projects" className={styles.breadcrumb__link}>
              {t.projects}
            </Link>
            {separator}
            <Link to={`/projects/${projectSlug}`} className={styles.breadcrumb__link}>
              {safeProjectName}
            </Link>
            {separator}
            <span className={styles.breadcrumb__current}>{safeTitle}</span>
          </>
        );
      } else {
        return (
          <>
            {homeLink}
            {separator}
            <Link to="/properties" className={styles.breadcrumb__link}>
              {t.properties}
            </Link>
            {separator}
            <span className={styles.breadcrumb__current}>{safeTitle}</span>
          </>
        );
      }
    }

    return (
      <>
        {homeLink}
        {separator}
        <span className={styles.breadcrumb__current}>{getCurrentPageTitle()}</span>
      </>
    );
  };

  return (
    <section
      className={styles.breadcrumb}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className={styles.breadcrumb__overlay}></div>
      <div className={styles.breadcrumb__container}>
        <nav className={styles.breadcrumb__nav}>{getBreadcrumbNavigation()}</nav>

        <div className={styles.breadcrumb__content}>
          <div className={styles.breadcrumb__header}>
            {safePropertyType && (
              <div className={styles.breadcrumb__type}>{safePropertyType}</div>
            )}
            <h1 className={styles.breadcrumb__title}>{safeTitle}</h1>
          </div>
          {safeLocation && (
            <div className={styles.breadcrumb__location}>
              <MapPin size={20} />
              <span>{safeLocation}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageBreadcrumb;
