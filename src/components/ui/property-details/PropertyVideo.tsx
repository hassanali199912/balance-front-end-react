import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyVideo.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PropertyVideoProps {
  videoUrl?: string;
  videoThumbnail?: string;
  title: string;
  titleAr: string;
}

const PropertyVideo: React.FC<PropertyVideoProps> = ({
  videoUrl,
  videoThumbnail,
  title,
  titleAr
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [isPlaying, setIsPlaying] = useState(false);

  const content = {
    en: {
      title: 'Property Video Tour',
      playVideo: 'Play Video Tour',
      closeVideo: 'Close Video',
      noVideo: 'No video available for this property'
    },
    ar: {
      title: 'جولة فيديو للعقار',
      playVideo: 'تشغيل جولة الفيديو',
      closeVideo: 'إغلاق الفيديو',
      noVideo: 'لا يوجد فيديو متاح لهذا العقار'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const propertyTitle = isArabic ? titleAr : title;

  if (!videoUrl) {
    return (
      <div className={styles.video__empty} dir={isArabic ? 'rtl' : 'ltr'}>
        <p>{t.noVideo}</p>
      </div>
    );
  }

  return (
    <div className={styles.video} dir={isArabic ? 'rtl' : 'ltr'}
    >
      <h2 className={styles.video__title}>{t.title}</h2>
      
      {!isPlaying ? (
        <div className={styles.video__thumbnail} onClick={() => setIsPlaying(true)}>
          <img
            src={videoThumbnail || '/images/video-placeholder.jpg'}
            alt={`${propertyTitle} - Video Tour`}
            className={styles.video__thumbnail_image}
          />
          <div className={styles.video__play_overlay}>
            <button className={styles.video__play_btn} title={t.playVideo}>
              <Play size={32} fill="currentColor" />
            </button>
            <span className={styles.video__play_text}>{t.playVideo}</span>
          </div>
        </div>
      ) : (
        <div className={styles.video__player}>
          <div className={styles.video__player_header}>
            <h3 className={styles.video__player_title}>{propertyTitle}</h3>
            <button
              className={styles.video__close_btn}
              onClick={() => setIsPlaying(false)}
              title={t.closeVideo}
            >
              <X size={20} />
            </button>
          </div>
          <div className={styles.video__player_container}>
            <video
              src={videoUrl}
              controls
              autoPlay
              className={styles.video__player_video}
              onEnded={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyVideo;
