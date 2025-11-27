import React, { useState } from 'react';
import { Heart, Calendar, MapPin, Tag } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectInfo.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import { useAuth } from '../../../contexts/useAuth';

interface ProjectInfoProps {
  project?: {
    id?: number | null;
    name?: string | null;
    nameAr?: string | null;
    location?: string | null;
    locationAr?: string | null;
    category?: string | null;
    categoryAr?: string | null;
    isFavorited?: boolean | null;
    completionDate?: string | null;
  };
  onFavoriteToggle?: () => void;
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({ project, onFavoriteToggle }) => {
  const { currentLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { isProjectFavorited, addProjectToFavorites, removeProjectFromFavorites } = useFavorites();

  const isArabic = currentLanguage.code === 'ar';
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  const content = {
    en: {
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      category: 'Category',
      location: 'Location',
      completionDate: 'Completion Date',
      projectInfo: 'Project Information',
      addedToFavorites: 'Added to favorites!',
      removedFromFavorites: 'Removed from favorites!',
      notAvailable: 'N/A',
    },
    ar: {
      addToFavorites: 'أضف للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      category: 'الفئة',
      location: 'الموقع',
      completionDate: 'تاريخ الانتهاء',
      projectInfo: 'معلومات المشروع',
      addedToFavorites: 'تم الإضافة للمفضلة!',
      removedFromFavorites: 'تم الإزالة من المفضلة!',
      notAvailable: 'غير متوفر',
    },
  };

  const t = isArabic ? content.ar : content.en;

  // لو المشروع فاضي تمامًا
  if (!project) {
    return (
      <section className={styles.info} dir={isArabic ? 'rtl' : 'ltr'}>
        <p className={styles.info__empty}>{t.notAvailable}</p>
      </section>
    );
  }

  const projectId = project.id ?? 0;
  const isFavorited = projectId ? isProjectFavorited(projectId) : false;

  const handleFavoriteClick = async () => {
    if (!isAuthenticated || !projectId) return;
    if (isTogglingFavorite) return;

    setIsTogglingFavorite(true);

    try {
      if (isFavorited) {
        await removeProjectFromFavorites(projectId);
      } else {
        await addProjectToFavorites(projectId);
      }

      onFavoriteToggle?.();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return t.notAvailable;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return t.notAvailable;

    return isArabic
      ? date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className={styles.info} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.info__container}>
        <div className={styles.info__header}>
          <div className={styles.info__title_section}>
            <h2 className={styles.info__title}>
              {isArabic
                ? project.nameAr || t.notAvailable
                : project.name || t.notAvailable}
            </h2>
            <p className={styles.info__subtitle}>{t.projectInfo}</p>
          </div>

          {projectId ? (
            <button
              className={`${styles.info__favorite_btn} ${isFavorited ? styles.info__favorite_btn_active : ''}`}
              onClick={handleFavoriteClick}
              disabled={isTogglingFavorite || !isAuthenticated}
              title={isFavorited ? t.removeFromFavorites : t.addToFavorites}
            >
              <Heart
                size={24}
                fill={isFavorited ? '#ef4444' : 'none'}
                color={isFavorited ? '#ef4444' : '#64748b'}
              />
            </button>
          ) : null}
        </div>

        <div className={styles.info__content}>
          <div className={styles.info__grid}>
            {/* Category */}
            <div className={styles.info__item}>
              <div className={styles.info__item_header}>
                <Tag size={20} className={styles.info__item_icon} />
                <h3 className={styles.info__item_title}>{t.category}</h3>
              </div>
              <p className={styles.info__item_value}>
                {isArabic
                  ? project.categoryAr || t.notAvailable
                  : project.category || t.notAvailable}
              </p>
            </div>

            {/* Location */}
            <div className={styles.info__item}>
              <div className={styles.info__item_header}>
                <MapPin size={20} className={styles.info__item_icon} />
                <h3 className={styles.info__item_title}>{t.location}</h3>
              </div>
              <p className={styles.info__item_value}>
                {isArabic
                  ? project.locationAr || t.notAvailable
                  : project.location || t.notAvailable}
              </p>
            </div>

            {/* Completion Date */}
            <div className={styles.info__item}>
              <div className={styles.info__item_header}>
                <Calendar size={20} className={styles.info__item_icon} />
                <h3 className={styles.info__item_title}>{t.completionDate}</h3>
              </div>
              <p className={styles.info__item_value}>
                {formatDate(project.completionDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
