import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from '../../../styles/components/home/HeroSection.module.css';
import { useLanguage } from '../../../contexts/useLanguage';


const slides = {
  en: [
    {
      title: 'Choose Your Perfect Home',
      description: 'We help you find the perfect home easily.',
      browse: 'Browse properties',
      image: 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350813/slide01_ntinrh.png',
      alt: 'Luxury Property'
    },
    {
      title: 'Luxury Properties in Saudi Arabia',
      description: 'Discover exceptional real estate opportunities with premium amenities.',
      browse: 'View Collection',
      image: 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350814/slide02_e6wb9r.png',
      alt: 'Premium Real Estate'
    },
    {
      title: 'Smart Real Estate Investment',
      description: 'Build your wealth with strategic property investments.',
      browse: 'Start Investing',
      image: 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350814/slide03_d1g24p.png',
      alt: 'Investment Properties'
    }
  ],
  ar: [
    {
      title: 'اختر منزلك المثالي',
      description: 'نساعدك في العثور على المنزل المثالي بسهولة.',
      browse: 'تصفح العقارات',
      image: 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350813/slide01_ntinrh.png',
      alt: 'منزل فاخر'
    },
    {
      title: 'عقارات فاخرة في المملكة العربية السعودية',
      description: 'اكتشف فرص عقارية استثنائية مع وسائل راحة متميزة.',
      browse: 'عرض المجموعة',
      image: 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350814/slide02_e6wb9r.png',
      alt: 'عقارات مميزة'
    },
    {
      title: 'استثمار عقاري ذكي',
      description: 'ابن ثروتك من خلال استثمارات عقارية استراتيجية.',
      browse: 'ابدأ الاستثمار',
      image: 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350814/slide03_d1g24p.png',
      alt: 'عقارات استثمارية'
    }
  ]
};


const HeroSection: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [currentSlide, setCurrentSlide] = useState(0);

  const currentSlides = useMemo(() => {
    return isArabic ? slides.ar : slides.en;
  }, [isArabic]);
  
  const currentSlideData = useMemo(() => {
    return currentSlides[currentSlide];
  }, [currentSlides, currentSlide]);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSlides.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [currentSlides.length]);

  
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <section
      className={styles.hero}
      dir={isArabic ? 'rtl' : 'ltr'}
      style={isArabic ? { fontFamily: 'Cairo, sans-serif' } : {}}
    >
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          {/* Left Content */}
          <div className={styles.hero__text} key={currentSlide}>
            <div>
              <h1 className={styles.hero__title}>{currentSlideData.title}</h1>
              <p className={styles.hero__description}>{currentSlideData.description}</p>
            </div>
            <div className={styles.hero__cta}>
              <button className={styles["hero__btn-primary"]}>
                {currentSlideData.browse}
              </button>
            </div>
            {/* Slider Indicators */}
            <div className={styles.hero__indicators}>
              {currentSlides.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.hero__indicator} ${
                    index === currentSlide ? styles.active : ''
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
          {/* Right Content - Image/Visual */}
          <div className={styles.hero__image}>
            <img 
              key={`slide-${currentSlide}`}
              src={currentSlideData.image} 
              alt={currentSlideData.alt}
              className={styles.hero__slide}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
