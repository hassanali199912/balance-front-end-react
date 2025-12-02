import React from 'react';
import { Building, Calendar, Users, MapPin, Award, TrendingUp } from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyOverview.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface OverviewItem {
  icon: React.ReactNode;
  label: string;
  labelAr: string;
  value: string;
  valueAr?: string;
}

interface PropertyOverviewProps {
  propertyId: string;
  developer: string;
  developerAr: string;
  completionDate: string;
  totalUnits?: number;
  floorsCount?: number;
  parkingSpaces?: number;
  propertyAge: number;
  investmentReturn?: number;
  neighborhood: string;
  neighborhoodAr: string;
  nearbyFacilities: string[];
  nearbyFacilitiesAr: string[];
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({
  developer,
  developerAr,
  completionDate,
  totalUnits,
  floorsCount,
  parkingSpaces,
  propertyAge,
  investmentReturn,
  neighborhood,
  neighborhoodAr,
  nearbyFacilities,
  nearbyFacilitiesAr
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      title: 'Property Overview',
      developer: 'Developer',
      completionDate: 'Completion Date',
      totalUnits: 'Total Units',
      floors: 'Floors',
      parking: 'Parking Spaces',
      propertyAge: 'Property Age',
      investmentReturn: 'Investment Return',
      neighborhood: 'Neighborhood',
      nearbyFacilities: 'Nearby Facilities',
      years: 'years',
      year: 'year',
      annually: 'annually',
      units: 'units',
      spaces: 'spaces'
    },
    ar: {
      title: 'نظرة عامة على العقار',
      developer: 'المطور',
      completionDate: 'تاريخ الإنجاز',
      totalUnits: 'إجمالي الوحدات',
      floors: 'الطوابق',
      parking: 'أماكن الانتظار',
      propertyAge: 'عمر العقار',
      investmentReturn: 'العائد الاستثماري',
      neighborhood: 'الحي',
      nearbyFacilities: 'المرافق القريبة',
      years: 'سنوات',
      year: 'سنة',
      annually: 'سنوياً',
      units: 'وحدة',
      spaces: 'مكان'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentDeveloper = isArabic ? developerAr : developer;
  const currentNeighborhood = isArabic ? neighborhoodAr : neighborhood;
  const currentFacilities = isArabic ? nearbyFacilitiesAr : nearbyFacilities;

  // Format property age
  const formatPropertyAge = (age: number) => {
    if (age === 1) {
      return `${age} ${t.year}`;
    }
    return `${age} ${t.years}`;
  };

  // Build overview items
  const overviewItems: OverviewItem[] = [
    {
      icon: <Building size={20} />,
      label: t.developer,
      labelAr: t.developer,
      value: currentDeveloper
    },
    {
      icon: <Calendar size={20} />,
      label: t.completionDate,
      labelAr: t.completionDate,
      value: completionDate
    },
    {
      icon: <Calendar size={20} />,
      label: t.propertyAge,
      labelAr: t.propertyAge,
      value: formatPropertyAge(propertyAge)
    },
    {
      icon: <MapPin size={20} />,
      label: t.neighborhood,
      labelAr: t.neighborhood,
      value: currentNeighborhood
    }
  ];

  if (totalUnits) {
    overviewItems.push({
      icon: <Users size={20} />,
      label: t.totalUnits,
      labelAr: t.totalUnits,
      value: `${totalUnits} ${t.units}`
    });
  }

  if (floorsCount) {
    overviewItems.push({
      icon: <Building size={20} />,
      label: t.floors,
      labelAr: t.floors,
      value: floorsCount.toString()
    });
  }

  if (parkingSpaces) {
    overviewItems.push({
      icon: <Users size={20} />,
      label: t.parking,
      labelAr: t.parking,
      value: `${parkingSpaces} ${t.spaces}`
    });
  }

  if (investmentReturn) {
    overviewItems.push({
      icon: <TrendingUp size={20} />,
      label: t.investmentReturn,
      labelAr: t.investmentReturn,
      value: `${investmentReturn}% ${t.annually}`
    });
  }

  return (
    <div className={styles.overview} dir={isArabic ? 'rtl' : 'ltr'}
    >
      <h2 className={styles.overview__title}>{t.title}</h2>
      
      <div className={styles.overview__grid}>
        {overviewItems.map((item, index) => (
          <div key={index} className={styles.overview__item}>
            <div className={styles.overview__item_icon}>
              {item.icon}
            </div>
            <div className={styles.overview__item_content}>
              <span className={styles.overview__item_label}>
                {item.label}
              </span>
              <span className={styles.overview__item_value}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {currentFacilities.length > 0 && (
        <div className={styles.overview__facilities}>
          <h3 className={styles.overview__facilities_title}>
            <Award size={20} />
            {t.nearbyFacilities}
          </h3>
          <div className={styles.overview__facilities_grid}>
            {currentFacilities.map((facility, index) => (
              <div key={index} className={styles.overview__facility}>
                <span className={styles.overview__facility_dot}></span>
                {facility}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyOverview;
