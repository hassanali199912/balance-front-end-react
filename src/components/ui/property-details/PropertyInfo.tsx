import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  MapPin,
  DollarSign,
  Key,
  Users,
  Car,
  Wifi,
  Shield,
  Zap,
  Building
} from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyInfo.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import { useAuth } from '../../../contexts/useAuth';
import Toast from '../Toast';

interface PropertyFeature {
  icon: React.ReactNode;
  label: string;
  labelAr: string;
  value: string;
  valueAr?: string;
}

interface PropertyInfoProps {
  propertyId: string;
  title: string;
  titleAr: string;
  location: string;
  locationAr: string;
  price: number;
  priceType: 'sale' | 'rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt?: number;
  propertyType: string;
  propertyTypeAr: string;
  availability: 'available' | 'sold' | 'rented';
  features: string[];
  featuresAr: string[];
  amenities: string[];
  amenitiesAr: string[];
  isFavorite: boolean;
  onFavoriteToggle?: () => void; // Make optional since we'll handle internally
  isTogglingFavorite?: boolean;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({
  propertyId,
  title,
  titleAr,
  location,
  locationAr,
  price,
  priceType,
  bedrooms,
  bathrooms,
  area,
  yearBuilt,
  propertyType,
  propertyTypeAr,
  availability,
  features,
  featuresAr,
  amenities,
  amenitiesAr,
  isFavorite,
  onFavoriteToggle,
  isTogglingFavorite = false
}) => {
  const { currentLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { 
    isUnitFavorited,
    addUnitToFavorites,
    removeUnitFromFavorites
  } = useFavorites();
  
  const isArabic = currentLanguage.code === 'ar';
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [isInternalToggling, setIsInternalToggling] = useState(false);

  // Use favorites context to get the actual favorite status
  const actualIsFavorite = isUnitFavorited(parseInt(propertyId));

  const content = {
    en: {
      priceFor: {
        sale: 'For Sale',
        rent: 'For Rent'
      },
      currency: 'EGP',
      perMonth: '/month',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      yearBuilt: 'Year Built',
      propertyType: 'Property Type',
      availability: {
        available: 'Available',
        sold: 'Sold',
        rented: 'Rented'
      },
      features: 'Key Features',
      amenities: 'Amenities',
      favorite: 'Add to Favorites',
      favoriteAdded: 'Added to favorites',
      favoriteRemoved: 'Removed from favorites',
      share: 'Share Property',
      shared: 'Property link copied to clipboard',
      viewMore: 'View More',
      viewLess: 'View Less',
      sqm: 'sqm'
    },
    ar: {
      priceFor: {
        sale: 'للبيع',
        rent: 'للإيجار'
      },
      currency: 'جنيه',
      perMonth: '/شهرياً',
      bedrooms: 'غرف النوم',
      bathrooms: 'دورات المياه',
      area: 'المساحة',
      yearBuilt: 'سنة البناء',
      propertyType: 'نوع العقار',
      availability: {
        available: 'متاح',
        sold: 'تم البيع',
        rented: 'مؤجر'
      },
      features: 'المميزات الرئيسية',
      amenities: 'وسائل الراحة',
      favorite: 'إضافة للمفضلة',
      favoriteAdded: 'تم الإضافة للمفضلة',
      favoriteRemoved: 'تم الحذف من المفضلة',
      share: 'مشاركة العقار',
      shared: 'تم نسخ رابط العقار',
      viewMore: 'عرض المزيد',
      viewLess: 'عرض أقل',
      sqm: 'متر مربع'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentTitle = isArabic ? titleAr : title;
  const currentLocation = isArabic ? locationAr : location;
  const currentType = isArabic ? propertyTypeAr : propertyType;
  const currentFeatures = isArabic ? featuresAr : features;
  const currentAmenities = isArabic ? amenitiesAr : amenities;

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-EG' : 'en-US').format(price);
  };

  // Property stats
  const propertyStats: PropertyFeature[] = [
    {
      icon: <Bed size={20} />,
      label: t.bedrooms,
      labelAr: t.bedrooms,
      value: bedrooms.toString()
    },
    {
      icon: <Bath size={20} />,
      label: t.bathrooms,
      labelAr: t.bathrooms,
      value: bathrooms.toString()
    },
    {
      icon: <Square size={20} />,
      label: t.area,
      labelAr: t.area,
      value: `${formatPrice(area)} ${t.sqm}`
    },
    {
      icon: <Building size={20} />,
      label: t.propertyType,
      labelAr: t.propertyType,
      value: currentType
    }
  ];

  if (yearBuilt) {
    propertyStats.push({
      icon: <Calendar size={20} />,
      label: t.yearBuilt,
      labelAr: t.yearBuilt,
      value: yearBuilt.toString()
    });
  }

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      // Could show a login prompt here
      return;
    }

    if (isInternalToggling || isTogglingFavorite) return;
    
    setIsInternalToggling(true);
    
    try {
      const unitId = parseInt(propertyId);
      
      if (actualIsFavorite) {
        await removeUnitFromFavorites(unitId);
      } else {
        await addUnitToFavorites(unitId);
      }
      
      // Call the optional external handler if provided (without showing extra toast)
      if (onFavoriteToggle) {
        onFavoriteToggle();
      }
      
    } catch (error) {
      console.error('Error toggling unit favorite:', error);
    } finally {
      setIsInternalToggling(false);
    }
  };

  // Handle share
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: currentTitle,
          text: `${currentTitle} - ${currentLocation}`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage(t.shared);
        setToastType('success');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Get availability status class
  const getAvailabilityClass = () => {
    switch (availability) {
      case 'available':
        return styles.status_available;
      case 'sold':
        return styles.status_sold;
      case 'rented':
        return styles.status_rented;
      default:
        return '';
    }
  };

  // Feature icons mapping
  const getFeatureIcon = (feature: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'parking': <Car size={16} />,
      'wifi': <Wifi size={16} />,
      'security': <Shield size={16} />,
      'elevator': <Zap size={16} />,
      'garden': <Users size={16} />,
      'balcony': <Square size={16} />,
      'موقف سيارات': <Car size={16} />,
      'إنترنت': <Wifi size={16} />,
      'أمن': <Shield size={16} />,
      'مصعد': <Zap size={16} />,
      'حديقة': <Users size={16} />,
      'شرفة': <Square size={16} />
    };
    return iconMap[feature.toLowerCase()] || <Key size={16} />;
  };

  return (
    <div className={styles.property_info} dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className={styles.property_info__header}>
        <div className={styles.property_info__title_section}>
          <h1 className={styles.property_info__title}>{currentTitle}</h1>
          <div className={styles.property_info__location}>
            <MapPin size={16} />
            {currentLocation}
          </div>
        </div>
        
        <div className={styles.property_info__actions}>
          <button
            className={`${styles.property_info__action_btn} ${
              actualIsFavorite ? styles.property_info__action_btn_active : ''
            }`}
            onClick={handleFavoriteToggle}
            disabled={isInternalToggling || isTogglingFavorite || !isAuthenticated}
            title={t.favorite}
          >
            <Heart size={20} fill={actualIsFavorite ? 'currentColor' : 'none'} />
          </button>
          <button
            className={styles.property_info__action_btn}
            onClick={handleShare}
            title={t.share}
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Price and Status */}
      <div className={styles.property_info__price_section}>
        <div className={styles.property_info__price}>
          <DollarSign size={24} />
          <span className={styles.property_info__price_amount}>
            {formatPrice(price)} {t.currency}
          </span>
          {priceType === 'rent' && (
            <span className={styles.property_info__price_period}>
              {t.perMonth}
            </span>
          )}
        </div>
        
        <div className={styles.property_info__badges}>
          <span className={styles.property_info__price_type}>
            {t.priceFor[priceType]}
          </span>
          <span className={`${styles.property_info__status} ${getAvailabilityClass()}`}>
            {t.availability[availability]}
          </span>
        </div>
      </div>

      {/* Property Stats */}
      <div className={styles.property_info__stats}>
        {propertyStats.map((stat, index) => (
          <div key={index} className={styles.property_info__stat}>
            <div className={styles.property_info__stat_icon}>
              {stat.icon}
            </div>
            <div className={styles.property_info__stat_content}>
              <span className={styles.property_info__stat_value}>
                {stat.value}
              </span>
              <span className={styles.property_info__stat_label}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Key Features */}
      {currentFeatures.length > 0 && (
        <div className={styles.property_info__section}>
          <h3 className={styles.property_info__section_title}>
            {t.features}
          </h3>
          <div className={styles.property_info__features}>
            {currentFeatures.map((feature, index) => (
              <div key={index} className={styles.property_info__feature}>
                {getFeatureIcon(feature)}
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {currentAmenities.length > 0 && (
        <div className={styles.property_info__section}>
          <h3 className={styles.property_info__section_title}>
            {t.amenities}
          </h3>
          <div className={styles.property_info__amenities}>
            {currentAmenities.map((amenity, index) => (
              <div key={index} className={styles.property_info__amenity}>
                {getFeatureIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default PropertyInfo;
