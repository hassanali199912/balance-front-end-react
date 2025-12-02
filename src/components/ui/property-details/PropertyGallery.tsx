import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, X, ZoomIn, Download } from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyGallery.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PropertyGalleryProps {
  images: string[];
  videos?: string[];
  virtualTour?: string;
  propertyName: string;
  propertyNameAr: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  videos = [],
  virtualTour,
  propertyName,
  propertyNameAr
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMediaType, setActiveMediaType] = useState<'images' | 'videos' | 'tour'>('images');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const content = {
    en: {
      photos: 'Photos',
      videos: 'Videos',
      virtualTour: '360° Tour',
      viewAll: 'View All',
      download: 'Download',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      of: 'of'
    },
    ar: {
      photos: 'الصور',
      videos: 'الفيديوهات',
      virtualTour: 'جولة افتراضية',
      viewAll: 'عرض الكل',
      download: 'تحميل',
      close: 'إغلاق',
      previous: 'السابق',
      next: 'التالي',
      of: 'من'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const propertyTitle = isArabic ? propertyNameAr : propertyName;

  // Get current media array based on active type
  const getCurrentMedia = () => {
    switch (activeMediaType) {
      case 'videos':
        return videos;
      case 'tour':
        return virtualTour ? [virtualTour] : [];
      default:
        return images;
    }
  };

  const currentMedia = getCurrentMedia();

  // Navigation functions
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % currentMedia.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % currentMedia.length);
  }, [currentMedia.length]);

  const lightboxPrevious = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + currentMedia.length) % currentMedia.length);
  }, [currentMedia.length]);

  // Reset active index when media type changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeMediaType]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            if (isArabic) {
              lightboxNext();
            } else {
              lightboxPrevious();
            }
            break;
          case 'ArrowRight':
            if (isArabic) {
              lightboxPrevious();
            } else {
              lightboxNext();
            }
            break;
          case 'Escape':
            closeLightbox();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLightboxOpen, isArabic, lightboxNext, lightboxPrevious]);

  if (currentMedia.length === 0) {
    return (
      <div className={styles.gallery__empty}>
        <p>{isArabic ? 'لا توجد وسائط متاحة' : 'No media available'}</p>
      </div>
    );
  }

  return (
    <div
      className={styles.gallery}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Media Type Tabs */}
      <div className={styles.gallery__tabs}>
        {images.length > 0 && (
          <button
            className={`${styles.gallery__tab} ${activeMediaType === 'images' ? styles.gallery__tab_active : ''}`}
            onClick={() => setActiveMediaType('images')}
          >
            {t.photos} ({images.length})
          </button>
        )}
        {videos.length > 0 && (
          <button
            className={`${styles.gallery__tab} ${activeMediaType === 'videos' ? styles.gallery__tab_active : ''}`}
            onClick={() => setActiveMediaType('videos')}
          >
            {t.videos} ({videos.length})
          </button>
        )}
        {virtualTour && (
          <button
            className={`${styles.gallery__tab} ${activeMediaType === 'tour' ? styles.gallery__tab_active : ''}`}
            onClick={() => setActiveMediaType('tour')}
          >
            {t.virtualTour}
          </button>
        )}
      </div>

      {/* Main Gallery */}
      <div className={styles.gallery__main}>
        <div className={styles.gallery__primary}>
          {activeMediaType === 'images' ? (
            <div className={styles.gallery__image_container}>
              <img
                src={currentMedia[activeIndex]}
                alt={`${propertyTitle} - Image ${activeIndex + 1}`}
                className={styles.gallery__primary_image}
                onClick={() => openLightbox(activeIndex)}
              />
              <button
                className={styles.gallery__zoom_btn}
                onClick={() => openLightbox(activeIndex)}
                title={isArabic ? 'تكبير الصورة' : 'Zoom image'}
              >
                <ZoomIn size={20} />
              </button>
            </div>
          ) : activeMediaType === 'videos' ? (
            <div className={styles.gallery__video_container}>
              <video
                src={currentMedia[activeIndex]}
                controls
                className={styles.gallery__primary_video}
              />
            </div>
          ) : (
            <div className={styles.gallery__tour_container}>
              <iframe
                src={virtualTour}
                className={styles.gallery__tour_frame}
                title={`${propertyTitle} Virtual Tour`}
                allowFullScreen
              />
            </div>
          )}

          {/* Navigation arrows */}
          {currentMedia.length > 1 && (
            <>
              <button
                className={`${styles.gallery__nav_btn} ${styles.gallery__nav_btn_prev}`}
                onClick={goToPrevious}
                title={t.previous}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className={`${styles.gallery__nav_btn} ${styles.gallery__nav_btn_next}`}
                onClick={goToNext}
                title={t.next}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Media counter */}
          <div className={styles.gallery__counter}>
            {activeIndex + 1} {t.of} {currentMedia.length}
          </div>
        </div>

        {/* Thumbnails */}
        {currentMedia.length > 1 && (
          <div className={styles.gallery__thumbnails}>
            {currentMedia.slice(0, 6).map((media, index) => (
              <div
                key={index}
                className={`${styles.gallery__thumbnail} ${
                  index === activeIndex ? styles.gallery__thumbnail_active : ''
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {activeMediaType === 'images' ? (
                  <img
                    src={media}
                    alt={`Thumbnail ${index + 1}`}
                    className={styles.gallery__thumbnail_image}
                  />
                ) : activeMediaType === 'videos' ? (
                  <div className={styles.gallery__thumbnail_video}>
                    <video src={media} className={styles.gallery__thumbnail_image} />
                    <div className={styles.gallery__thumbnail_play}>
                      <Play size={16} />
                    </div>
                  </div>
                ) : (
                  <div className={styles.gallery__thumbnail_tour}>
                    <span>360°</span>
                  </div>
                )}
              </div>
            ))}
            
            {currentMedia.length > 6 && (
              <button
                className={styles.gallery__view_all}
                onClick={() => openLightbox(0)}
              >
                +{currentMedia.length - 6}
                <br />
                {t.viewAll}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && activeMediaType === 'images' && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightbox__content} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lightbox__close}
              onClick={closeLightbox}
              title={t.close}
            >
              <X size={24} />
            </button>

            <img
              src={currentMedia[lightboxIndex]}
              alt={`${propertyTitle} - Image ${lightboxIndex + 1}`}
              className={styles.lightbox__image}
            />

            {currentMedia.length > 1 && (
              <>
                <button
                  className={`${styles.lightbox__nav} ${styles.lightbox__nav_prev}`}
                  onClick={lightboxPrevious}
                  title={t.previous}
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className={`${styles.lightbox__nav} ${styles.lightbox__nav_next}`}
                  onClick={lightboxNext}
                  title={t.next}
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className={styles.lightbox__info}>
              <span className={styles.lightbox__counter}>
                {lightboxIndex + 1} {t.of} {currentMedia.length}
              </span>
              <button
                className={styles.lightbox__download}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = currentMedia[lightboxIndex];
                  link.download = `${propertyTitle}-image-${lightboxIndex + 1}.jpg`;
                  link.click();
                }}
                title={t.download}
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
