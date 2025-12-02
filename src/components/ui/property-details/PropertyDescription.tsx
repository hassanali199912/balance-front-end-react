import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyDescription.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PropertyDescriptionProps {
  description: string;
  descriptionAr: string;
  highlights: string[];
  highlightsAr: string[];
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
  description,
  descriptionAr,
  highlights,
  highlightsAr
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [isExpanded, setIsExpanded] = useState(false);

  const content = {
    en: {
      title: 'Property Description',
      highlights: 'Property Highlights',
      readMore: 'Read More',
      readLess: 'Read Less'
    },
    ar: {
      title: 'وصف العقار',
      highlights: 'مميزات العقار',
      readMore: 'قراءة المزيد',
      readLess: 'قراءة أقل'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentDescription = isArabic ? descriptionAr : description;
  const currentHighlights = isArabic ? highlightsAr : highlights;

  const truncatedDescription = currentDescription.length > 300 
    ? currentDescription.substring(0, 300) + '...'
    : currentDescription;

  const showReadMore = currentDescription.length > 300;

  return (
    <div className={styles.description} dir={isArabic ? 'rtl' : 'ltr'} 
    >
      <h2 className={styles.description__title}>{t.title}</h2>
      
      <div className={styles.description__content}>
        <p className={styles.description__text}>
          {isExpanded ? currentDescription : truncatedDescription}
        </p>
        
        {showReadMore && (
          <button
            className={styles.description__toggle}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? t.readLess : t.readMore}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {currentHighlights.length > 0 && (
        <div className={styles.description__highlights}>
          <h3 className={styles.description__highlights_title}>{t.highlights}</h3>
          <ul className={styles.description__highlights_list}>
            {currentHighlights.map((highlight, index) => (
              <li key={index} className={styles.description__highlight_item}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyDescription;
