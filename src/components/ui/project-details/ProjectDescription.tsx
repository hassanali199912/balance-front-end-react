import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectDescription.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ProjectDescriptionProps {
  description?: string | null;
  descriptionAr?: string | null;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description, descriptionAr }) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [isExpanded, setIsExpanded] = useState(false);

  const content = {
    en: {
      title: 'Project Description',
      readMore: 'Read More',
      readLess: 'Read Less',
      notAvailable: 'Description not available.',
    },
    ar: {
      title: 'وصف المشروع',
      readMore: 'قراءة المزيد',
      readLess: 'قراءة أقل',
      notAvailable: 'الوصف غير متوفر.',
    },
  };

  const t = isArabic ? content.ar : content.en;
  const currentDescription = (isArabic ? descriptionAr : description)?.trim() || '';

  const CHAR_LIMIT = 300;
  const isEmpty = currentDescription.length === 0;
  const shouldShowToggle = currentDescription.length > CHAR_LIMIT;

  const displayText = isEmpty
    ? t.notAvailable
    : isExpanded || !shouldShowToggle
    ? currentDescription
    : currentDescription.substring(0, CHAR_LIMIT) + '...';

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <section className={styles.description} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.description__container}>
        <h2 className={styles.description__title}>{t.title}</h2>

        <div className={styles.description__content}>
          <div className={styles.description__text_container}>
            <p
              className={`${styles.description__text} ${
                isExpanded ? styles.description__text_expanded : ''
              }`}
            >
              {displayText}
            </p>

            {!isExpanded && shouldShowToggle && !isEmpty && (
              <div className={styles.description__fade}></div>
            )}
          </div>

          {shouldShowToggle && !isEmpty && (
            <button className={styles.description__toggle} onClick={toggleExpanded}>
              <span>{isExpanded ? t.readLess : t.readMore}</span>
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDescription;
