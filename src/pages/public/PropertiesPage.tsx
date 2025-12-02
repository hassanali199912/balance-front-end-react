import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search, SlidersHorizontal, Grid, List, MapPin } from 'lucide-react';
import PropertyCard from '../../components/ui/properties/PropertyCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useLanguage } from '../../contexts/useLanguage';
import styles from '../../styles/pages/PropertiesPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUnitsAPi } from '../../store/slices/UnitSlice';
import { Pagination } from '../../components/ui/projects';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    titleEn: 'Luxury Apartment in Downtown',
    titleAr: 'شقة فاخرة في وسط المدينة',
    price: 1250000,
    currency: 'EGP',
    type: 'apartment',
    typeEn: 'Apartment',
    typeAr: 'شقة',
    status: 'available' as const,
    locationEn: 'New Cairo, Cairo',
    locationAr: 'القاهرة الجديدة، القاهرة',
    area: 150,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    image: '/assets/slider-images/slide01.png',
    isAvailable: true
  },
  {
    id: 2,
    titleEn: 'Modern Villa with Garden',
    titleAr: 'فيلا حديثة مع حديقة',
    price: 2500000,
    currency: 'EGP',
    type: 'villa',
    typeEn: 'Villa',
    typeAr: 'فيلا',
    status: 'available' as const,
    locationEn: 'Sheikh Zayed, Giza',
    locationAr: 'الشيخ زايد، الجيزة',
    area: 350,
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    image: '/assets/slider-images/slide02.png',
    isAvailable: true
  },
  {
    id: 3,
    titleEn: 'Cozy Studio Near Metro',
    titleAr: 'استوديو مريح بالقرب من المترو',
    price: 750000,
    currency: 'EGP',
    type: 'studio',
    typeEn: 'Studio',
    typeAr: 'استوديو',
    status: 'unavailable' as const,
    locationEn: 'Maadi, Cairo',
    locationAr: 'المعادي، القاهرة',
    area: 60,
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    image: '/assets/slider-images/slide03.png',
    isAvailable: false
  },
  {
    id: 4,
    titleEn: 'Penthouse with City View',
    titleAr: 'بنتهاوس مع إطلالة على المدينة',
    price: 3500000,
    currency: 'EGP',
    type: 'penthouse',
    typeEn: 'Penthouse',
    typeAr: 'بنتهاوس',
    status: 'available' as const,
    locationEn: 'Zamalek, Cairo',
    locationAr: 'الزمالك، القاهرة',
    area: 250,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    image: '/assets/slider-images/slide01.png',
    isAvailable: true
  },
  {
    id: 5,
    titleEn: 'Family Duplex',
    titleAr: 'دوبلكس عائلي',
    price: 1800000,
    currency: 'EGP',
    type: 'duplex',
    typeEn: 'Duplex',
    typeAr: 'دوبلكس',
    status: 'available' as const,
    locationEn: '6th October, Giza',
    locationAr: '6 أكتوبر، الجيزة',
    area: 200,
    bedrooms: 4,
    bathrooms: 3,
    parking: 1,
    image: '/assets/slider-images/slide02.png',
    isAvailable: true
  },
  {
    id: 6,
    titleEn: 'Compact Apartment',
    titleAr: 'شقة مدمجة',
    price: 950000,
    currency: 'EGP',
    type: 'apartment',
    typeEn: 'Apartment',
    typeAr: 'شقة',
    status: 'available' as const,
    locationEn: 'Heliopolis, Cairo',
    locationAr: 'مصر الجديدة، القاهرة',
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    image: '/assets/slider-images/slide03.png',
    isAvailable: true
  }
];

const PropertiesPage: React.FC = () => {
  //#region Code

  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [properties, setProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({

    Type: '',
    MinPrice: '',
    MaxPrice: '',
    NumberOfRooms: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const content = {
    en: {
      title: 'Properties',
      subtitle: 'Find your perfect property',
      searchPlaceholder: 'Search properties...',
      filters: 'Filters',
      viewMode: 'View Mode',
      grid: 'Grid',
      list: 'List',
      noResults: 'No properties found',
      noResultsDesc: 'Try adjusting your search criteria',
      loading: 'Loading properties...',
      propertyType: 'Property Type',
      priceRange: 'Price Range',
      bedrooms: 'Bedrooms',
      location: 'Location',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      clearFilters: 'Clear Filters',
      applyFilters: 'Apply Filters',
      results: 'Results',
      propertyTypes: {
        apartment: 'Apartment',
        villa: 'Villa',
        studio: 'Studio',
        penthouse: 'Penthouse',
        duplex: 'Duplex'
      }
    },
    ar: {
      title: 'العقارات',
      subtitle: 'اعثر على العقار المثالي',
      searchPlaceholder: 'البحث في العقارات...',
      filters: 'الفلاتر',
      viewMode: 'طريقة العرض',
      grid: 'شبكة',
      list: 'قائمة',
      noResults: 'لا توجد عقارات',
      noResultsDesc: 'حاول تعديل معايير البحث',
      loading: 'جاري تحميل العقارات...',
      propertyType: 'نوع العقار',
      priceRange: 'نطاق السعر',
      bedrooms: 'غرف النوم',
      location: 'الموقع',
      minPrice: 'أقل سعر',
      maxPrice: 'أعلى سعر',
      clearFilters: 'مسح الفلاتر',
      applyFilters: 'تطبيق الفلاتر',
      results: 'النتائج',
      propertyTypes: {
        apartment: 'شقة',
        villa: 'فيلا',
        studio: 'استوديو',
        penthouse: 'بنتهاوس',
        duplex: 'دوبلكس'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockProperties);
      setLoading(false);
    };

    fetchProperties();
  }, []);



  const clearFilters = () => {
    setFilters({
      Type: '',
      MinPrice: '',
      MaxPrice: '',
      NumberOfRooms: '',
      location: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
    dispatch(getUnitsAPi({
      ...filters,
      Page: 1
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    console.log("key", key, "value", value);

    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
    console.log("this is filter unites", filters);
    // Type=2&NumberOfRooms=1&MinPrice=5000&MaxPrice=10000000
    dispatch(getUnitsAPi({
      ...filters,
      Page: 1
    }))
  };

  const [currentPage, setCurrentPage] = useState(1);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(getUnitsAPi({
      ...filters,
      Page: page
    }));
  };

  //#endregion Code

  //#region Fetch Data


  const { unit: {
    data, loading: unitLoading, error: unitError
  } } = useSelector((state: RootState) => state.units);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUnitsAPi({}));
  }, [])


  useEffect(() => {
    if (!unitLoading && data !== null) {
      console.log("Unit Loaded Data ", data);
    }
  }, [data, unitLoading])



  //#endregion Fetch Data 




  // if (unitLoading) {
  //   return (
  //     <div className={styles.properties_page__loading}>
  //       <LoadingSpinner text={t.loading} />
  //     </div>
  //   );
  // }

  return (
    <div className={styles.properties_page} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.properties__container}>

        {/* Header */}
        <div className={styles.properties_page__header}>
          <div className={styles.properties_page__title_section}>
            <h1 className={styles.properties_page__title}>{t.title}</h1>
            <p className={styles.properties_page__subtitle}>{t.subtitle}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={styles.properties_page__controls}>
          <div className={styles.properties_page__search}>
            <Search size={20} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.properties_page__search_input}
            />
          </div>

          <div className={styles.properties_page__actions}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`${styles.properties_page__filter_btn} ${showFilters ? styles.properties_page__filter_btn_active : ''}`}
            >
              <SlidersHorizontal size={20} />
              {t.filters}
            </button>

            <div className={styles.properties_page__view_toggle}>
              <button
                onClick={() => setViewMode('grid')}
                className={`${styles.properties_page__view_btn} ${viewMode === 'grid' ? styles.properties_page__view_btn_active : ''}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`${styles.properties_page__view_btn} ${viewMode === 'list' ? styles.properties_page__view_btn_active : ''}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className={styles.properties_page__filters}>
            <div className={styles.properties_page__filters_grid}>
              <div className={styles.properties_page__filter_group}>
                <label>{t.propertyType}</label>
                <select
                  value={filters.Type}
                  onChange={(e) => handleFilterChange('Type', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value={1}>{t.propertyTypes.apartment}</option>
                  <option value={2}>{t.propertyTypes.villa}</option>
                  <option value={3}>{t.propertyTypes.studio}</option>
                  <option value={4}>{t.propertyTypes.penthouse}</option>
                  <option value={5}>{t.propertyTypes.duplex}</option>
                </select>
              </div>

              <div className={styles.properties_page__filter_group}>
                <label>{t.minPrice}</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.MinPrice}
                  onChange={(e) => handleFilterChange('MinPrice', e.target.value)}
                />
              </div>

              <div className={styles.properties_page__filter_group}>
                <label>{t.maxPrice}</label>
                <input
                  type="number"
                  placeholder="10000000"
                  value={filters.MaxPrice}
                  onChange={(e) => handleFilterChange('MaxPrice', e.target.value)}
                />
              </div>

              <div className={styles.properties_page__filter_group}>
                <label>{t.bedrooms}</label>
                <select
                  value={filters.NumberOfRooms}
                  onChange={(e) => handleFilterChange('NumberOfRooms', e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>

            <div className={styles.properties_page__filters_actions}>
              <button onClick={clearFilters} className={styles.properties_page__clear_btn}>
                {t.clearFilters}
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        {data &&
          (<div className={styles.properties_page__results_header}>
            <p className={styles.properties_page__results_count}>
              {data.totalCount + ""} {t.results}
            </p>
          </div>)
        }

        {unitLoading ? <>
          <div className={styles.properties_page__loading}>
            <LoadingSpinner text={t.loading} />
          </div>

        </> : <>
          {data === null || data.items.length === 0 ? (
            <div className={styles.properties_page__no_results}>
              <MapPin size={48} />
              <h3>{t.noResults}</h3>
              <p>{t.noResultsDesc}</p>
              <button onClick={clearFilters} className={styles.properties_page__clear_btn}>
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <>
              <div className={`${styles.properties_page__grid} ${viewMode === 'list' ? styles.properties_page__grid_list : ''
                }`}>
                {data.items.map((property, index) => (

                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={() => {
                    }}
                    animationDelay={index * 0.1}
                  />
                ))}
              </div>

            </>
          )}

          <div className='pt-5'>
            <Pagination
              currentPage={currentPage}
              totalPages={data && data.totalCount ? Math.ceil(Number(data.totalCount) / 10) : 1}
              onPageChange={handlePageChange}
              itemsPerPage={10}
              totalItems={data && data.totalCount ? Number(data.totalCount) : 0}
            />

          </div>
        </>}




      </div>
    </div>
  );
};

export default PropertiesPage;
