import React from 'react';
import { MapPin, Calendar, Eye, ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import styles from '../../../styles/components/projects/ProjectCard.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import { Project } from '../../../store/slices/ProjectSlice';

export interface ProjectCardData {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  location: string;
  locationAr: string;
  status: 'available' | 'comingSoon';
  district: string;
  city: string;
  area: string;
  price?: string;
  priceAr?: string;
  completionDate: string;
  units?: number;
  slug: string;
}

interface ProjectCardProps {
  project: Project;
  onViewDetails: (slug: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewDetails
}) => {
  const { currentLanguage } = useLanguage();
  const {
    isProjectFavorited,
    addProjectToFavorites,
    removeProjectFromFavorites
  } = useFavorites();
  const isArabic = currentLanguage.code === 'ar';
  const isFavorited = isProjectFavorited(project.id);

  const content = {
    en: {
      viewDetails: 'View Details',
      available: 'Available',
      comingSoon: 'Coming Soon',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      units: 'units',
      completionDate: 'Completion'
    },
    ar: {
      viewDetails: 'عرض التفاصيل',
      available: 'متاح',
      comingSoon: 'قريباً',
      addToFavorites: 'أضف للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      units: 'وحدة',
      completionDate: 'تاريخ الإنجاز'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const projectData = {
    title: isArabic ? project.nameAr : project.nameEn,
    description: isArabic ? project.descriptionAr : project.descriptionEn,
    location: isArabic ? project.locationAr : project.locationEn,
    price: isArabic ? project.cost : project.cost
  };

  const getStatusText = (status: string) => {
    return status === 'available' ? t.available : t.comingSoon;
  };

  const getStatusClass = (status: string) => {
    return status === 'available'
      ? styles.project_card__status_available
      : styles.project_card__status_coming;
  };

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (isFavorited) {
      await removeProjectFromFavorites(project.id);
    } else {
      await addProjectToFavorites(project.id);
    }
  };
  return (
    <div className={styles.project_card} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Image */}
      <div className={styles.project_card__image_container}>
        <img
          src={project.mainImageUrl}
          alt={projectData.title}
          className={styles.project_card__image}
        />

        {/* Status Badge */}
        <div className={`${styles.project_card__status} ${getStatusClass(project.statusNameEn)}`}>
          {getStatusText(project.statusNameEn)}
        </div>

        {/* Favorite Button */}
        <button
          className={`${styles.project_card__favorite} ${isFavorited ? styles.project_card__favorite_active : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorited ? t.removeFromFavorites : t.addToFavorites}
        >
          <Heart
            size={20}
            fill={isFavorited ? '#FBBF24' : 'none'}
          />
        </button>

        {/* View Overlay */}
        <div className={styles.project_card__overlay}>
          <button
            className={styles.project_card__view_btn}
            onClick={() => onViewDetails(`${project.id}`)}
          >
            <Eye size={20} />
            <span>{t.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.project_card__content}>
        {/* Header */}
        <div className={styles.project_card__header}>
          <h3 className={styles.project_card__title}>
            {projectData.title}
          </h3>
          {projectData.price && (
            <div className={styles.project_card__price}>
              {projectData.price}
            </div>
          )}
        </div>

        {/* Description */}
        <p className={styles.project_card__description}>
          {projectData.description}
        </p>

        {/* Meta Info */}
        <div className={styles.project_card__meta}>
          <div className={styles.project_card__meta_item}>
            <MapPin size={16} />
            <span>{projectData.location}</span>
          </div>

          <div className={styles.project_card__meta_item}>
            <Calendar size={16} />
            <span>{t.completionDate}: {project.estimatedCompletionDate}</span>
          </div>

          {project.countOfUnits && (
            <div className={styles.project_card__meta_item}>
              <span>{project.countOfUnits} {t.units}</span>
            </div>
          )}
        </div>

        {/* Action */}
        <button
          className={styles.project_card__action}
          onClick={() => onViewDetails(`${project.id}`)}
        >
          <span>{t.viewDetails}</span>
          {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
