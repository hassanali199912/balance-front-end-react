import React from 'react';
import { MapPin, DollarSign, Square, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/components/dashboard/PropertyCard.module.css';

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price?: string | number;
  area?: number;
  image: string;
  type?: 'project' | 'unit';
  onRemove?: (id: number) => void;
  viewUrl: string;
  isArabic: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  price,
  area,
  image,
  type = 'unit',
  onRemove,
  viewUrl,
  isArabic
}) => {
  const content = {
    en: {
      remove: 'Remove',
      view: 'View Details',
      sar: 'SAR',
      sqm: 'sqm'
    },
    ar: {
      remove: 'إزالة',
      view: 'عرض التفاصيل',
      sar: 'ريال',
      sqm: 'م²'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const formatPrice = (price: string | number) => {
    if (typeof price === 'number') {
      return `${price.toLocaleString()} ${t.sar}`;
    }
    return price;
  };

  return (
    <div className={styles.property_card} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.property_card__image}>
        <img src={image} alt={title} />
      </div>
      
      <div className={styles.property_card__content}>
        <h4 className={styles.property_card__title}>{title}</h4>
        
        <div className={styles.property_card__meta}>
          <div className={styles.property_card__meta_item}>
            <MapPin size={16} />
            <span>{location}</span>
          </div>
          
          {price && (
            <div className={styles.property_card__meta_item}>
              <DollarSign size={16} />
              <span>{formatPrice(price)}</span>
            </div>
          )}
          
          {area && (
            <div className={styles.property_card__meta_item}>
              <Square size={16} />
              <span>{area} {t.sqm}</span>
            </div>
          )}
        </div>

        <div className={styles.property_card__actions}>
          <Link 
            to={viewUrl} 
            className={styles.property_card__view_btn}
          >
            <ExternalLink size={16} />
            {t.view}
          </Link>
          
          {onRemove && (
            <button 
              onClick={() => onRemove(id)}
              className={styles.property_card__remove_btn}
            >
              <Trash2 size={16} />
              {t.remove}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
