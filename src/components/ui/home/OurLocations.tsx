import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../../styles/components/home/OurLocations.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

// Global flag to track if Google Maps script has been loaded
let googleMapsScriptLoaded = false;

// بيانات المواقع مع إحداثيات جغرافية حقيقية
const projectLocations = [
  {
    id: 1,
    name: {
      ar: 'مجمع الياسمين السكني',
      en: 'Yasmin Residential Complex'
    },
    address: {
      ar: 'شمال الرياض، المملكة العربية السعودية',
      en: 'North Riyadh, Saudi Arabia'
    },
    coordinates: {
      lat: 24.8607,
      lng: 46.7219
    },
    phone: '+966 11 123 4567',
    status: {
      ar: 'قيد الإنشاء',
      en: 'Under Construction'
    },
    type: {
      ar: 'سكني',
      en: 'Residential'
    }
  },
  {
    id: 2,
    name: {
      ar: 'برج النخيل التجاري',
      en: 'Palm Tower Commercial'
    },
    address: {
      ar: 'وسط جدة، المملكة العربية السعودية',
      en: 'Central Jeddah, Saudi Arabia'
    },
    coordinates: {
      lat: 21.5433,
      lng: 39.1728
    },
    phone: '+966 12 123 4567',
    status: {
      ar: 'مكتمل',
      en: 'Completed'
    },
    type: {
      ar: 'تجاري',
      en: 'Commercial'
    }
  },
  {
    id: 3,
    name: {
      ar: 'مدينة الأعمال الذكية',
      en: 'Smart Business City'
    },
    address: {
      ar: 'شرق الدمام، المملكة العربية السعودية',
      en: 'East Dammam, Saudi Arabia'
    },
    coordinates: {
      lat: 26.4207,
      lng: 50.0888
    },
    phone: '+966 13 123 4567',
    status: {
      ar: 'قيد التخطيط',
      en: 'Planning Phase'
    },
    type: {
      ar: 'مختلط',
      en: 'Mixed Use'
    }
  },
  {
    id: 4,
    name: {
      ar: 'قرية الورود العائلية',
      en: 'Rose Family Village'
    },
    address: {
      ar: 'غرب الرياض، المملكة العربية السعودية',
      en: 'West Riyadh, Saudi Arabia'
    },
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    },
    phone: '+966 11 123 4568',
    status: {
      ar: 'قيد الإنشاء',
      en: 'Under Construction'
    },
    type: {
      ar: 'سكني',
      en: 'Residential'
    }
  },
  {
    id: 5,
    name: {
      ar: 'مركز الماس التجاري',
      en: 'Diamond Commercial Center'
    },
    address: {
      ar: 'شمال جدة، المملكة العربية السعودية',
      en: 'North Jeddah, Saudi Arabia'
    },
    coordinates: {
      lat: 21.6042,
      lng: 39.1467
    },
    phone: '+966 12 123 4568',
    status: {
      ar: 'متاح للبيع',
      en: 'Available for Sale'
    },
    type: {
      ar: 'تجاري',
      en: 'Commercial'
    }
  },
  {
    id: 6,
    name: {
      ar: 'مجمع الأندلس الفاخر',
      en: 'Andalus Luxury Complex'
    },
    address: {
      ar: 'جنوب الرياض، المملكة العربية السعودية',
      en: 'South Riyadh, Saudi Arabia'
    },
    coordinates: {
      lat: 24.6408,
      lng: 46.7728
    },
    phone: '+966 11 123 4569',
    status: {
      ar: 'قيد الإنشاء',
      en: 'Under Construction'
    },
    type: {
      ar: 'فاخر',
      en: 'Luxury'
    }
  }
];

const OurLocations: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [mapLoaded, setMapLoaded] = useState(false);

  const content = {
    en: {
      subtitle: 'Find Us',
      title: 'Our Locations',
      description: 'Discover our projects across Saudi Arabia. Each location represents our commitment to excellence and innovation in real estate development.',
      contactUs: 'Contact Us',
      getDirections: 'Get Directions',
      viewOnMap: 'View on Map',
      status: 'Status',
      type: 'Type',
      phone: 'Phone',
      loadingMap: 'Loading Map...'
    },
    ar: {
      subtitle: 'ابحث عنا',
      title: 'مواقعنا',
      description: 'اكتشف مشاريعنا في جميع أنحاء المملكة العربية السعودية. كل موقع يمثل التزامنا بالتميز والابتكار في التطوير العقاري.',
      contactUs: 'اتصل بنا',
      getDirections: 'احصل على الاتجاهات',
      viewOnMap: 'عرض على الخريطة',
      status: 'الحالة',
      type: 'النوع',
      phone: 'الهاتف',
      loadingMap: 'جاري تحميل الخريطة...'
    }
  };

  const t = isArabic ? content.ar : content.en;

  // إنشاء دالة لتهيئة الخريطة
  const initializeMap = useCallback(() => {
    const mapElement = document.getElementById('google-map');
    if (!mapElement || !window.google || !window.google.maps) return;
    
    // منع إنشاء خرائط متعددة
    if (mapElement.dataset.mapInitialized === 'true') return;
    mapElement.dataset.mapInitialized = 'true';

    // مركز الخريطة (وسط المملكة العربية السعودية)
    const centerLocation = { lat: 24.7136, lng: 46.6753 };

    const map = new window.google.maps.Map(mapElement, {
      zoom: 6,
      center: centerLocation,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
        }
      ]
    });

    // إضافة markers لكل موقع
    projectLocations.forEach((location) => {
      // إنشاء ماركر بشكل GPS تقليدي
      const marker = new window.google.maps.Marker({
        position: location.coordinates,
        map: map,
        title: isArabic ? location.name.ar : location.name.en,
        icon: {
          url: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 40 16 40S32 28 32 16C32 7.16 24.84 0 16 0Z" fill="#B58863"/>
              <path d="M16 2C8.27 2 2 8.27 2 16C2 26.67 16 37.33 16 37.33S30 26.67 30 16C30 8.27 23.73 2 16 2Z" fill="#D4A574"/>
              <circle cx="16" cy="16" r="8" fill="#fff"/>
              <circle cx="16" cy="16" r="5" fill="#B58863"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 40),
          anchor: new window.google.maps.Point(16, 40)
        }
      });

      // إضافة Info Window محسن مع رابط المشروع
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 1.5rem; max-width: 300px; font-family: 'Cairo', sans-serif; direction: ${isArabic ? 'rtl' : 'ltr'};">
            <h3 style="margin: 0 0 1rem 0; color: #291C0E; font-size: 1.2rem; font-weight: 700;">
              ${isArabic ? location.name.ar : location.name.en}
            </h3>
            <p style="margin: 0 0 1rem 0; color: #666; font-size: 0.95rem; line-height: 1.4;">
              ${isArabic ? location.address.ar : location.address.en}
            </p>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0.75rem; background: #f8f9fa; border-radius: 8px;">
              <div style="text-align: center;">
                <div style="color: #B58863; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">
                  ${isArabic ? 'الحالة' : 'Status'}
                </div>
                <div style="color: #291C0E; font-size: 0.9rem;">
                  ${isArabic ? location.status.ar : location.status.en}
                </div>
              </div>
              <div style="text-align: center;">
                <div style="color: #B58863; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem;">
                  ${isArabic ? 'النوع' : 'Type'}
                </div>
                <div style="color: #291C0E; font-size: 0.9rem;">
                  ${isArabic ? location.type.ar : location.type.en}
                </div>
              </div>
            </div>
            
            <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
              <button 
                onclick="window.open('/project/${location.id}', '_blank')"
                style="flex: 1; background: #B58863; color: white; border: none; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                onmouseover="this.style.background='#A0785A'"
                onmouseout="this.style.background='#B58863'"
              >
                ${isArabic ? 'عرض المشروع' : 'View Project'}
              </button>
              <button 
                onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}', '_blank')"
                style="flex: 1; background: transparent; color: #B58863; border: 2px solid #B58863; padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                onmouseover="this.style.background='#B58863'; this.style.color='white'"
                onmouseout="this.style.background='transparent'; this.style.color='#B58863'"
              >
                ${isArabic ? 'الاتجاهات' : 'Directions'}
              </button>
            </div>
            
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.85rem; color: #666;">
              ${isArabic ? 'الهاتف:' : 'Phone:'} <strong style="color: #291C0E;">${location.phone}</strong>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }, [isArabic]);

  // تحميل Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded or script is already being loaded
      if ((window.google && window.google.maps) || googleMapsScriptLoaded) {
        setMapLoaded(true);
        return;
      }

      // Mark that we're loading the script to prevent multiple loads
      googleMapsScriptLoaded = true;

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBb7zIoQBrl3GWQ2E4DyJ677ZVDtkQu_sQ';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=marker`;
      script.async = true;
      script.defer = true;
      
      // Only define initMap if it doesn't already exist
      if (!window.initMap) {
        window.initMap = () => {
          setMapLoaded(true);
          // تهيئة الخريطة مباشرة عند تحميل API
          setTimeout(initializeMap, 100);
        };
      }

      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // تهيئة الخريطة عند تحميلها أو تغيير اللغة
  useEffect(() => {
    if (mapLoaded && window.google && window.google.maps) {
      // إعادة تعيين حالة الخريطة عند تغيير اللغة
      const mapElement = document.getElementById('google-map');
      if (mapElement) {
        mapElement.dataset.mapInitialized = 'false';
      }
      initializeMap();
    }
  }, [mapLoaded, initializeMap]);

  return (
    <section className={styles.locations} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.locations__container}>
        {/* Section Header */}
        <div className={styles.locations__header}>
          <div className={styles.locations__subtitle}>
            {t.subtitle}
          </div>
          <h2 className={styles.locations__title}>
            {t.title}
          </h2>
          <p className={styles.locations__description}>
            {t.description}
          </p>
        </div>

        {/* Main Content - الخريطة فقط */}
        <div className={styles.locations__content}>
          {/* Google Map */}
          <div className={styles.locations__map}>
            {!mapLoaded ? (
              <div className={styles.locations__map_loading}>
                <div className={styles.locations__loading_spinner}></div>
                <p>{t.loadingMap}</p>
              </div>
            ) : (
              <div id="google-map" className={styles.locations__map_container}></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLocations;
