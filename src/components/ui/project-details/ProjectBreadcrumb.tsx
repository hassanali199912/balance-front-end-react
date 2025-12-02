import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, MapPin } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectBreadcrumb.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ProjectBreadcrumbProps {
  projectName: string;
  projectNameAr: string;
  location: string;
  locationAr: string;
  backgroundImage?: string;
}

const ProjectBreadcrumb: React.FC<ProjectBreadcrumbProps> = ({
  projectName,
  projectNameAr,
  location,
  locationAr,
  backgroundImage
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const routeLocation = useLocation();
  const isProjectsPage = routeLocation.pathname === '/projects';

  const content = {
    en: {
      home: 'Home',
      projects: 'Projects',
      projectDetails: 'Project Details'
    },
    ar: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      projectDetails: 'تفاصيل المشروع'
    }
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <section 
      className={styles.breadcrumb} 
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className={styles.breadcrumb__overlay}></div>
      <div className={styles.breadcrumb__container}>
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumb__nav}>
          <Link to="/" className={styles.breadcrumb__link}>
            <Home size={16} />
            {t.home}
          </Link>
          <ChevronRight size={16} className={styles.breadcrumb__separator} />
          {isProjectsPage ? (
            <span className={styles.breadcrumb__current}>
              {t.projects}
            </span>
          ) : (
            <>
              <Link to="/projects" className={styles.breadcrumb__link}>
                {t.projects}
              </Link>
              <ChevronRight size={16} className={styles.breadcrumb__separator} />
              <span className={styles.breadcrumb__current}>
                {t.projectDetails}
              </span>
            </>
          )}
        </nav>

        {/* Project Info */}
        <div className={styles.breadcrumb__content}>
          <h1 className={styles.breadcrumb__title}>
            {isArabic ? projectNameAr : projectName}
          </h1>
          <div className={styles.breadcrumb__location}>
            <MapPin size={20} />
            <span>{isArabic ? locationAr : location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectBreadcrumb;