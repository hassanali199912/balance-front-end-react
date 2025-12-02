import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyLocationMap.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PropertyLocationMapProps {
  latitude?: number;
  longitude?: number;
  address: string;
  addressAr: string;
  city: string;
  cityAr: string;
  district: string;
  districtAr: string;
  mapEmbedUrl?: string;
}

const PropertyLocationMap: React.FC<PropertyLocationMapProps> = ({
  latitude,
  longitude,
  address,
  addressAr,
  city,
  cityAr,
  district,
  districtAr,
  mapEmbedUrl
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      title: 'Location & Map',
      address: 'Address',
      city: 'City',
      district: 'District',
      getDirections: 'Get Directions',
      viewOnMap: 'View on Google Maps'
    },
    ar: {
      title: 'الموقع والخريطة',
      address: 'العنوان',
      city: 'المدينة',
      district: 'المنطقة',
      getDirections: 'احصل على الاتجاهات',
      viewOnMap: 'عرض على خرائط جوجل'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentAddress = isArabic ? addressAr : address;
  const currentCity = isArabic ? cityAr : city;
  const currentDistrict = isArabic ? districtAr : district;

  // Get Google Maps API key from environment variables
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Check if API key is available
  if (!googleMapsApiKey) {
    console.warn('Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.');
  }

  // Generate Google Maps URLs
  const googleMapsUrl = latitude && longitude 
    ? `https://www.google.com/maps?q=${latitude},${longitude}`
    : `https://www.google.com/maps/search/${encodeURIComponent(currentAddress + ', ' + currentCity)}`;

  const directionsUrl = latitude && longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(currentAddress + ', ' + currentCity)}`;

  // Default embed URL if not provided - using API key from environment
  const embedUrl = mapEmbedUrl || (googleMapsApiKey ? (latitude && longitude 
    ? `https://www.google.com/maps/embed/v1/view?key=${googleMapsApiKey}&center=${latitude},${longitude}&zoom=15&language=${isArabic ? 'ar' : 'en'}`
    : `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(currentAddress + ', ' + currentCity)}&language=${isArabic ? 'ar' : 'en'}`)
    : null);

  return (
    <div className={styles.location} dir={isArabic ? 'rtl' : 'ltr'}>
      <h2 className={styles.location__title}>{t.title}</h2>
      
      <div className={styles.location__content}>
        {/* Address Information */}
        <div className={styles.location__info}>
          <div className={styles.location__address}>
            <div className={styles.location__address_item}>
              <MapPin size={16} />
              <div className={styles.location__address_content}>
                <span className={styles.location__address_label}>{t.address}</span>
                <span className={styles.location__address_value}>{currentAddress}</span>
              </div>
            </div>
            
            <div className={styles.location__address_item}>
              <MapPin size={16} />
              <div className={styles.location__address_content}>
                <span className={styles.location__address_label}>{t.district}</span>
                <span className={styles.location__address_value}>{currentDistrict}</span>
              </div>
            </div>
            
            <div className={styles.location__address_item}>
              <MapPin size={16} />
              <div className={styles.location__address_content}>
                <span className={styles.location__address_label}>{t.city}</span>
                <span className={styles.location__address_value}>{currentCity}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.location__actions}>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.location__action_btn}
            >
              <Navigation size={16} />
              {t.getDirections}
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.location__action_btn} ${styles.location__action_btn_secondary}`}
            >
              <MapPin size={16} />
              {t.viewOnMap}
            </a>
          </div>
        </div>

        {/* Map */}
        <div className={styles.location__map}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className={styles.location__map_frame}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${currentAddress} - Map`}
            />
          ) : (
            <div className={styles.location__map_placeholder}>
              <MapPin size={48} />
              <p>{isArabic ? 'الخريطة غير متوفرة - يرجى إضافة مفتاح Google Maps API' : 'Map not available - Please add Google Maps API key'}</p>
              <small>{isArabic ? 'أضف VITE_GOOGLE_MAPS_API_KEY إلى ملف .env' : 'Add VITE_GOOGLE_MAPS_API_KEY to .env file'}</small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyLocationMap;
