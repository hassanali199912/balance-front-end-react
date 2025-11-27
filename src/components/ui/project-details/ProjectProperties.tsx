import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectProperties.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import { useAuth } from '../../../contexts/useAuth';
import Toast from '../common/Toast';
import { Unit } from '../../../store/slices/UnitSlice';

interface ProjectProperty {
  id: number;
  name: string;
  nameAr: string;
  type: string;
  typeAr: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  building: string;
  buildingAr: string;
  features: string[];
  featuresAr: string[];
  images: string[];
  status: 'available' | 'sold' | 'reserved';
  isFavorited?: boolean;
}

interface PropertyFilters {
  priceRange: {
    min: number;
    max: number;
  };
  bedrooms: string;
  building: string;
  floor: string;
  features: string[];
}

interface ProjectPropertiesProps {
  properties: Unit[];
  onFavoriteToggle?: (propertyId: string) => void; // Make optional since we'll handle internally
}

const ProjectProperties: React.FC<ProjectPropertiesProps> = ({
  properties,
  onFavoriteToggle
}) => {
  const { currentLanguage } = useLanguage();
  const { isAuthenticated } = useAuth();
  const {
    isUnitFavorited,
    addUnitToFavorites,
    removeUnitFromFavorites
  } = useFavorites();

  const isArabic = currentLanguage.code === 'ar';

  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: { min: 0, max: 10000000 },
    bedrooms: '',
    building: '',
    floor: '',
    features: []
  });

  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });
  const itemsPerPage = 12;

  const content = {
    en: {
      title: 'Available Properties',
      filter: 'Filter Properties',
      clearFilters: 'Clear All',
      priceRange: 'Price Range',
      bedrooms: 'Bedrooms',
      building: 'Building',
      floor: 'Floor',
      features: 'Additional Features',
      all: 'All',
      min: 'Min',
      max: 'Max',
      sar: 'SAR',
      sqm: 'sqm',
      viewDetails: 'View Details',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      available: 'Available',
      sold: 'Sold',
      reserved: 'Reserved',
      showingResults: 'Showing {start}-{end} of {total} properties',
      noResults: 'No properties found with current filters',
      gridView: 'Grid View',
      listView: 'List View',
      nextPage: 'Next',
      previousPage: 'Previous',
      page: 'Page',
      favoriteAdded: 'Property added to favorites!',
      favoriteRemoved: 'Property removed from favorites!'
    },
    ar: {
      title: 'العقارات المتاحة',
      filter: 'تصفية العقارات',
      clearFilters: 'مسح الكل',
      priceRange: 'نطاق السعر',
      bedrooms: 'عدد الغرف',
      building: 'المبنى',
      floor: 'الطابق',
      features: 'مزايا إضافية',
      all: 'الكل',
      min: 'الحد الأدنى',
      max: 'الحد الأقصى',
      sar: 'ريال',
      sqm: 'م²',
      viewDetails: 'عرض التفاصيل',
      addToFavorites: 'أضف للمفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      available: 'متاح',
      sold: 'مباع',
      reserved: 'محجوز',
      showingResults: 'عرض {start}-{end} من {total} عقار',
      noResults: 'لم يتم العثور على عقارات بالفلاتر الحالية',
      gridView: 'عرض الشبكة',
      listView: 'عرض القائمة',
      nextPage: 'التالي',
      previousPage: 'السابق',
      page: 'صفحة',
      favoriteAdded: 'تم إضافة العقار للمفضلة!',
      favoriteRemoved: 'تم إزالة العقار من المفضلة!'
    }
  };

  const t = isArabic ? content.ar : content.en;

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const bedroomsSet = new Set(properties.map(p => p.numberOfRooms.toString()));
    const buildingsSet = new Set(properties.map(p => p.building));
    const floorsSet = new Set(properties.map(p => p.floor.toString()));
    const featuresSet = new Set(properties.flatMap(p => p.features));

    return {
      bedrooms: Array.from(bedroomsSet).sort(),
      buildings: Array.from(buildingsSet).sort(),
      floors: Array.from(floorsSet).sort((a, b) => parseInt(a) - parseInt(b)),
      features: Array.from(featuresSet).sort()
    };
  }, [properties, isArabic]);

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Price range filter
      if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
        return false;
      }

      // Bedrooms filter
      if (filters.bedrooms && property.numberOfRooms.toString() !== filters.bedrooms) {
        return false;
      }

      // Building filter
      if (filters.building) {
        const buildingName = property.building;
        if (buildingName !== filters.building) {
          return false;
        }
      }

      // Floor filter
      if (filters.floor && property.floor.toString() !== filters.floor) {
        return false;
      }

      // // Features filter
      // if (filters.features.length > 0) {
      //   const propertyFeatures = property.features;
      //   const hasAllFeatures = filters.features.every(feature =>
      //     propertyFeatures.includes(feature)
      //   );
      //   if (!hasAllFeatures) {
      //     return false;
      //   }
      // }

      return true;
    });
  }, [properties, filters, isArabic]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterType: keyof PropertyFilters, value: PropertyFilters[keyof PropertyFilters]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 10000000 },
      bedrooms: '',
      building: '',
      floor: '',
      features: []
    });
    setCurrentPage(1);
  };

  const handleFavoriteToggle = async (property: Unit, event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      // You could show a login prompt here or redirect to login
      return;
    }

    try {
      const unitId = (property.id);
      const isCurrentlyFavorited = isUnitFavorited(unitId);

      if (isCurrentlyFavorited) {
        await removeUnitFromFavorites(unitId);
      } else {
        await addUnitToFavorites(unitId);
      }

      // Call the optional external handler if provided
      if (onFavoriteToggle) {
        onFavoriteToggle(property.id + "");
      }

    } catch (error) {
      console.error('Error toggling unit favorite:', error);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US').format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10B981';
      case 'sold':
        return '#EF4444';
      case 'reserved':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <section className={styles.properties} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={closeToast}
      />

      <div className={styles.properties__container}>
        <div className={styles.properties__header}>
          <h2 className={styles.properties__title}>
            {t.title}
          </h2>

          <div className={styles.properties__controls}>
            <button
              className={styles.properties__filter_toggle}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={20} />
              {t.filter}
            </button>

            <div className={styles.properties__view_modes}>
              <button
                className={`${styles.properties__view_btn} ${viewMode === 'grid' ? styles.properties__view_btn_active : ''}`}
                onClick={() => setViewMode('grid')}
                title={t.gridView}
              >
                <Grid size={20} />
              </button>
              <button
                className={`${styles.properties__view_btn} ${viewMode === 'list' ? styles.properties__view_btn_active : ''}`}
                onClick={() => setViewMode('list')}
                title={t.listView}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={`${styles.properties__filters} ${isFilterOpen ? styles.properties__filters_open : ''}`}>
          <div className={styles.properties__filters_content}>
            {/* Price Range */}
            <div className={styles.properties__filter_group}>
              <label className={styles.properties__filter_label}>{t.priceRange}</label>
              <div className={styles.properties__price_range}>
                <div className={styles.properties__price_inputs}>
                  <input
                    type="number"
                    placeholder={t.min}
                    value={filters.priceRange.min || ''}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...filters.priceRange,
                      min: parseInt(e.target.value) || 0
                    })}
                    className={styles.properties__price_input}
                  />
                  <span className={styles.properties__price_separator}>-</span>
                  <input
                    type="number"
                    placeholder={t.max}
                    value={filters.priceRange.max === 10000000 ? '' : filters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...filters.priceRange,
                      max: parseInt(e.target.value) || 10000000
                    })}
                    className={styles.properties__price_input}
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className={styles.properties__filter_group}>
              <label className={styles.properties__filter_label}>{t.bedrooms}</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                className={styles.properties__filter_select}
              >
                <option value="">{t.all}</option>
                {filterOptions.bedrooms.map(bedroom => (
                  <option key={bedroom} value={bedroom}>{bedroom}</option>
                ))}
              </select>
            </div>

            {/* Building */}
            <div className={styles.properties__filter_group}>
              <label className={styles.properties__filter_label}>{t.building}</label>
              <select
                value={filters.building}
                onChange={(e) => handleFilterChange('building', e.target.value)}
                className={styles.properties__filter_select}
              >
                <option value="">{t.all}</option>
                {filterOptions.buildings.map(building => (
                  <option key={building} value={building}>{building}</option>
                ))}
              </select>
            </div>

            {/* Floor */}
            <div className={styles.properties__filter_group}>
              <label className={styles.properties__filter_label}>{t.floor}</label>
              <select
                value={filters.floor}
                onChange={(e) => handleFilterChange('floor', e.target.value)}
                className={styles.properties__filter_select}
              >
                <option value="">{t.all}</option>
                {filterOptions.floors.map(floor => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              className={styles.properties__clear_btn}
              onClick={clearAllFilters}
            >
              {t.clearFilters}
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className={styles.properties__results_info}>
          {filteredProperties.length > 0 ?
            t.showingResults
              .replace('{start}', ((currentPage - 1) * itemsPerPage + 1).toString())
              .replace('{end}', Math.min(currentPage * itemsPerPage, filteredProperties.length).toString())
              .replace('{total}', filteredProperties.length.toString())
            : t.noResults
          }
        </div>

        {/* Properties Grid/List */}
        {paginatedProperties.length > 0 ? (
          <div className={`${styles.properties__grid} ${viewMode === 'list' ? styles.properties__list : ''}`}>
            {paginatedProperties.map(property => (
              <div key={property.id} className={styles.properties__card}>
                <div className={styles.properties__card_image}>
                  <img
                    src={property.images[0]}
                    alt={isArabic ? property.titleAr : property.titleEn}
                    className={styles.properties__card_img}
                  />
                  <div className={styles.properties__card_status} style={{ backgroundColor: getStatusColor(["available", "sold", "reserved"].find((item, index) => { return (property.status) == index && item })) }}>
                    {t[["available", "sold", "reserved"].find((item, index) => { return property.status == index && item }) as keyof typeof t]}
                  </div>
                  <button
                    className={`${styles.properties__card_favorite} ${isUnitFavorited((property.id)) ? styles.properties__card_favorite_active : ''}`}
                    onClick={(e) => handleFavoriteToggle(property, e)}
                    disabled={!isAuthenticated}
                    title={isUnitFavorited((property.id)) ? t.removeFromFavorites : t.addToFavorites}
                  >
                    <Heart size={20} fill={isUnitFavorited((property.id)) ? '#FBBF24' : 'none'} />
                  </button>
                </div>

                <div className={styles.properties__card_content}>
                  <h3 className={styles.properties__card_name}>
                    {isArabic ? property.titleAr : property.titleEn}
                  </h3>
                  <p className={styles.properties__card_type}>
                    {property.type}
                  </p>
                  <p className={styles.properties__card_building}>
                    {property.building} - {t.floor} {property.floor}
                  </p>

                  <div className={styles.properties__card_specs}>
                    <div className={styles.properties__card_spec}>
                      <Bed size={16} />
                      <span>{property.numberOfRooms}</span>
                    </div>
                    <div className={styles.properties__card_spec}>
                      <Bath size={16} />
                      <span>{property.numberOfBathrooms}</span>
                    </div>
                    <div className={styles.properties__card_spec}>
                      <Square size={16} />
                      <span>{property.area} {t.sqm}</span>
                    </div>
                  </div>

                  <div className={styles.properties__card_price}>
                    {formatPrice(property.price)} {t.sar}
                  </div>

                  <Link
                    to={`/properties/${property.id}`}
                    className={styles.properties__card_btn}
                  >
                    <Eye size={16} />
                    {t.viewDetails}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.properties__empty}>
            <p>{t.noResults}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.properties__pagination}>
            <div className={styles.properties__pagination_info}>
              {t.showingResults
                .replace('{start}', ((currentPage - 1) * itemsPerPage + 1).toString())
                .replace('{end}', Math.min(currentPage * itemsPerPage, filteredProperties.length).toString())
                .replace('{total}', filteredProperties.length.toString())
              }
            </div>

            <div className={styles.properties__pagination_controls}>
              {/* First Page */}
              <button
                className={`${styles.properties__page_btn} ${styles.properties__page_btn_nav}`}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                title={isArabic ? 'الصفحة الأولى' : 'First Page'}
              >
                {isArabic ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
              </button>

              {/* Previous Page */}
              <button
                className={`${styles.properties__page_btn} ${styles.properties__page_btn_nav}`}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                title={isArabic ? 'الصفحة السابقة' : 'Previous Page'}
              >
                {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>

              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                const isVisible =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2);

                if (!isVisible) {
                  if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                    return (
                      <span key={pageNum} className={styles.properties__page_ellipsis}>
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    className={`${styles.properties__page_btn} ${currentPage === pageNum ? styles.properties__page_btn_active : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Page */}
              <button
                className={`${styles.properties__page_btn} ${styles.properties__page_btn_nav}`}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                title={isArabic ? 'الصفحة التالية' : 'Next Page'}
              >
                {isArabic ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>

              {/* Last Page */}
              <button
                className={`${styles.properties__page_btn} ${styles.properties__page_btn_nav}`}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                title={isArabic ? 'الصفحة الأخيرة' : 'Last Page'}
              >
                {isArabic ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectProperties;