import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectLocationMap.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ProjectLocationMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  addressAr: string;
  projectName: string;
  projectNameAr: string;
}

const ProjectLocationMap: React.FC<ProjectLocationMapProps> = ({
  coordinates,
  address,
  addressAr,
  projectName,
  projectNameAr
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      title: 'Project Location',
      address: 'Address',
      coordinates: 'Coordinates',
      openInMaps: 'Open in Google Maps',
      getDirections: 'Get Directions'
    },
    ar: {
      title: 'موقع المشروع',
      address: 'العنوان',
      coordinates: 'الإحداثيات',
      openInMaps: 'فتح في خرائط جوجل',
      getDirections: 'الحصول على الاتجاهات'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentAddress = isArabic ? addressAr : address;
  const currentProjectName = isArabic ? projectNameAr : projectName;

  const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

  return (
    <section className={styles.location} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.location__container}>
        <h2 className={styles.location__title}>{t.title} - {currentProjectName}</h2>
        
        <div className={styles.location__content}>
          {/* Map Container */}
          <div className={styles.location__map_container}>
            <div className={styles.location__map}>
              {/* Google Maps Embed */}
              <iframe
                src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=${isArabic ? 'ar' : 'en'}&z=15&output=embed`}
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px'
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Project Location"
              />
            </div>
          </div>

          {/* Location Info */}
          <div className={styles.location__info}>
            <div className={styles.location__info_item}>
              <h3 className={styles.location__info_title}>
                <MapPin size={20} />
                {t.address}
              </h3>
              <p className={styles.location__info_text}>
                {currentAddress}
              </p>
            </div>

            <div className={styles.location__info_item}>
              <h3 className={styles.location__info_title}>
                {t.coordinates}
              </h3>
              <p className={styles.location__info_text}>
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </p>
            </div>

            <div className={styles.location__actions}>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.location__action_btn}
              >
                <ExternalLink size={20} />
                {t.openInMaps}
              </a>
              <a 
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.location__action_btn} ${styles.location__action_btn_secondary}`}
              >
                <MapPin size={20} />
                {t.getDirections}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectLocationMap;