import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Square, Bed, Bath, Heart, Eye } from 'lucide-react';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import styles from '../../../styles/components/properties/PropertyCard.module.css';
import { Unit } from '../../../store/slices/UnitSlice';
import { getTypeText } from '../../../helpers/helpers';

export interface PropertyCardData {
  id: number;
  titleEn?: string;
  titleAr?: string;
  name?: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  price: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  locationEn?: string;
  locationAr?: string;
  location?: string;
  image: string;
  type?: string;
  typeEn?: string;
  typeAr?: string;
  isAvailable: boolean;
  status?: string;
  currency?: string;
  parking?: number;
  slug?: string;
}

interface PropertyCardProps {
  property: Unit;
  onViewDetails?: (id: number) => void;
  showLocation?: boolean;
  className?: string;
  animationDelay?: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  showLocation = true,
  className = '',
  animationDelay = 0
}) => {
  const { currentLanguage } = useLanguage();
  const {
    isUnitFavorited,
    addUnitToFavorites,
    removeUnitFromFavorites
  } = useFavorites();
  const isArabic = currentLanguage.code === 'ar';
  const isFavorited = isUnitFavorited(property.id);

  const content = {
    en: {
      viewDetails: 'View Details',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      available: 'Available',
      notAvailable: 'Not Available',
      sar: 'SAR',
      sqm: 'sqm'
    },
    ar: {
      viewDetails: 'عرض التفاصيل',
      addToFavorites: 'أضف للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      bedrooms: 'غرف النوم',
      bathrooms: 'الحمامات',
      area: 'المساحة',
      available: 'متاح',
      notAvailable: 'غير متاح',
      sar: 'ريال',
      sqm: 'م²'
    }
  };

  const t = isArabic ? content.ar : content.en;

  // Handle different data formats
  const propertyTitle = isArabic
    ? (property.titleAr || 'Untitled')
    : (property.titleEn || 'Untitled');

  // const propertyLocation = isArabic
  //   ? (property.locationAr || property.locationEn || property.location || '')
  //   : (property.locationEn || property.location || property.locationAr || '');




  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (isFavorited) {
        await removeUnitFromFavorites(property.id);
      } else {
        await addUnitToFavorites(property.id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewDetails) {
      onViewDetails(property.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US').format(price);
  };

  return (
    <div
      className={`${styles.property_card} ${className}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Image Container */}
      <div className={styles.property_card__image_container}>
        <img
          src={property.mainImageUrl}
          alt={propertyTitle}
          className={styles.property_card__image}
        />

        {/* Status Badge */}
        <div className={`${styles.property_card__status} ${property.isActive ? styles.property_card__status_available : styles.property_card__status_unavailable}`}>
          {property.isActive ? t.available : t.notAvailable}
        </div>

        {/* Favorite Button */}
        <button
          className={`${styles.property_card__favorite} ${isFavorited ? styles.property_card__favorite_active : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorited ? t.removeFromFavorites : t.addToFavorites}
        >
          <Heart
            size={18}
            fill={isFavorited ? '#ef4444' : 'none'}
            stroke={isFavorited ? '#ef4444' : 'currentColor'}
          />
        </button>

        {/* View Overlay */}
        <div className={styles.property_card__overlay}>
          <button
            className={styles.property_card__view_btn}
            onClick={handleViewClick}
          >
            <Eye size={18} />
            <span>{t.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.property_card__content}>
        {/* Header */}
        <div className={styles.property_card__header}>
          <h3 className={styles.property_card__title}>
            {propertyTitle}
          </h3>
          <div className={styles.property_card__price}>
            {formatPrice(property.price)} {t.sar}
          </div>
        </div>

        {/* Type */}
        <div className={styles.property_card__type}>
          {getTypeText(property.type).toString()}
        </div>

        {/* Location */}
        {/* {showLocation && (
          <div className={styles.property_card__location}>
            <MapPin size={14} />
            <span>{propertyLocation}</span>
          </div>
        )} */}

        {/* Details */}
        <div className={styles.property_card__details}>
          <div className={styles.property_card__detail}>
            <Square size={14} />
            <span>{property.area} {t.sqm}</span>
          </div>

          {property.numberOfRooms && (
            <div className={styles.property_card__detail}>
              <Bed size={14} />
              <span>{property.numberOfRooms}</span>
            </div>
          )}

          {property.numberOfBathrooms && (
            <div className={styles.property_card__detail}>
              <Bath size={14} />
              <span>{property.numberOfBathrooms}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {property.id ? (
          <Link
            to={`/properties/${property.id}`}
            className={styles.property_card__action}
          >
            {t.viewDetails}
          </Link>
        ) : (
          <button
            className={styles.property_card__action}
            onClick={handleViewClick}
          >
            {t.viewDetails}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
