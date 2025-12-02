import React, { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import styles from '../../../styles/components/projects/ProjectFilter.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { City, District, getFilterAPi, ProjectType, Region, Status } from '../../../store/slices/FiltersSlice';

export interface FilterOptions {
  status: string[];
  district: string[];
  city: string[];
  area: string[];
}

export interface ActiveFilters {

  RegionId: string,
  CityId: string,
  DistrictId: string,
  StatusId: string

}




interface FilterDropdownListProps {
  t: {
    status: string,
    all: string
  },
  label: string,
  FilterValue: string,
  handleFilterChange: (val: string, val2: string) => void,
  filterChangeObject: string,
  isArabic: boolean,
  filterData: ProjectType[] | Status[]
}

const FilterDropdownList: React.FC<FilterDropdownListProps> = ({ t, label, FilterValue, handleFilterChange, filterChangeObject, isArabic, filterData }) => {
  return <>
    <div className={styles.filter__group}>
      <label className={styles.filter__label}>{label}</label>
      <select
        className={styles.filter__select}
        value={FilterValue}
        onChange={(e) => handleFilterChange(`${filterChangeObject}`, e.target.value)}
      >
        <option value="">{t.all}</option>
        {filterData && filterData.length !== 0 && filterData.map(item => <option value={`${item.id}`}>
          {isArabic ? item.nameAr : item.name}
        </option>)}
        {/* <option value="available">{t.statusOptions.available}</option>
        <option value="comingSoon">{t.statusOptions.comingSoon}</option> */}
      </select>
    </div>
  </>
}
interface FilterDropdownListProps2 {
  t: {
    status: string,
    all: string
  },
  label: string,
  FilterValue: string,
  handleFilterChange: (val: string, val2: string) => void,
  filterChangeObject: string,
  isArabic: boolean,
  filterData: District[] | City[] | Region[]
}

const FilterDropdownList2: React.FC<FilterDropdownListProps2> = ({ t, label, FilterValue, handleFilterChange, filterChangeObject, isArabic, filterData }) => {
  return <>
    <div className={styles.filter__group}>
      <label className={styles.filter__label}>{label}</label>
      <select
        className={styles.filter__select}
        value={FilterValue}
        onChange={(e) => handleFilterChange(`${filterChangeObject}`, e.target.value)}
      >
        <option value="">{t.all}</option>
        {filterData && filterData.length !== 0 && filterData.map(item => <option value={`${item.id}`}>
          {isArabic ? item.nameAr : item.nameEn}
        </option>)}
        {/* <option value="available">{t.statusOptions.available}</option>
        <option value="comingSoon">{t.statusOptions.comingSoon}</option> */}
      </select>
    </div>
  </>
}

interface ProjectFilterProps {
  onFilterChange: (filters: ActiveFilters) => void;
  totalCount: number;
  filteredCount: number;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  onFilterChange,
  totalCount,
  filteredCount
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const {
    data, loading, error
  } = useSelector((state: RootState) => state.Filter);
  const dispatch = useDispatch<AppDispatch>();



  useEffect(() => {
    dispatch(getFilterAPi("project"));
  }, [])

  useEffect(() => {
    data && data.statuses && console.log("fetch Data", data.statuses);
  }, [data])

  const [filters, setFilters] = useState({
    RegionId: "",
    CityId: "",
    DistrictId: "",
    StatusId: ""
  });

  const [isOpen, setIsOpen] = useState(false);

  const content = {
    en: {
      filterTitle: 'Filter Projects',
      status: 'Status',
      district: 'District',
      city: 'City',
      area: 'Area',
      all: 'All',
      available: 'Available',
      comingSoon: 'Coming Soon',
      clearFilters: 'Clear All',
      showingResults: `Showing ${filteredCount} of ${totalCount} projects`,
      noResults: 'No projects found with current filters',
      statusOptions: {
        available: 'Available',
        comingSoon: 'Coming Soon'
      },
      districtOptions: {
        riyadh: 'Riyadh',
        jeddah: 'Jeddah',
        dammam: 'Dammam',
        khobar: 'Khobar'
      },
      cityOptions: {
        north: 'North Riyadh',
        south: 'South Riyadh',
        east: 'East Riyadh',
        west: 'West Riyadh'
      },
      areaOptions: {
        olaya: 'Olaya',
        malqa: 'Malqa',
        sulaimaniya: 'Sulaimaniya',
        sahafa: 'Sahafa'
      }
    },
    ar: {
      filterTitle: 'فلترة المشاريع',
      status: 'الحالة',
      district: 'المنطقة',
      city: 'المدينة',
      area: 'الحي',
      all: 'الكل',
      available: 'متاح',
      comingSoon: 'قريباً',
      clearFilters: 'مسح الكل',
      showingResults: `عرض ${filteredCount} من ${totalCount} مشروع`,
      noResults: 'لم يتم العثور على مشاريع بالفلاتر الحالية',
      statusOptions: {
        available: 'متاح',
        comingSoon: 'قريباً'
      },
      districtOptions: {
        riyadh: 'الرياض',
        jeddah: 'جدة',
        dammam: 'الدمام',
        khobar: 'الخبر'
      },
      cityOptions: {
        north: 'شمال الرياض',
        south: 'جنوب الرياض',
        east: 'شرق الرياض',
        west: 'غرب الرياض'
      },
      areaOptions: {
        olaya: 'العليا',
        malqa: 'الملقا',
        sulaimaniya: 'السليمانية',
        sahafa: 'الصحافة'
      }
    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      RegionId: "",
      CityId: "",
      DistrictId: "",
      StatusId: ""
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <div className={styles.filter} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.filter__container}>
        {/* Mobile Filter Toggle */}
        <div className={styles.filter__mobile_header}>
          <button
            className={styles.filter__toggle}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Filter size={20} />
            <span>{t.filterTitle}</span>
          </button>

          <div className={styles.filter__results}>
            {filteredCount > 0 ? t.showingResults : t.noResults}
          </div>
        </div>

        {/* Filter Controls */}
        <div className={`${styles.filter__controls} ${isOpen ? styles.filter__controls_open : ''}`}>
          <div className={styles.filter__grid}>


            <FilterDropdownList
              t={t}
              label={t.status}
              FilterValue={filters.StatusId}
              handleFilterChange={handleFilterChange}
              filterChangeObject={"StatusId"}
              isArabic={isArabic}
              filterData={data?.statuses ? data.statuses : []} />

            <FilterDropdownList2
              t={t}
              label={t.district}
              FilterValue={filters.DistrictId}
              handleFilterChange={handleFilterChange}
              filterChangeObject={"DistrictId"}
              isArabic={isArabic}
              filterData={data?.districts ? data.districts : []} />

            <FilterDropdownList2
              t={t}
              label={t.city}
              FilterValue={filters.CityId}
              handleFilterChange={handleFilterChange}
              filterChangeObject={"CityId"}
              isArabic={isArabic}
              filterData={data?.cities ? data.cities : []} />

            <FilterDropdownList2
              t={t}
              label={t.area}
              FilterValue={filters.DistrictId}
              handleFilterChange={handleFilterChange}
              filterChangeObject={"DistrictId"}
              isArabic={isArabic}
              filterData={data?.regions ? data.regions : []} />

            {/* Status Filter */}
            {/* <div className={styles.filter__group}>
              <label className={styles.filter__label}>{t.status}</label>
              <select
                className={styles.filter__select}
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">{t.all}</option>
                <option value="available">{t.statusOptions.available}</option>
                <option value="comingSoon">{t.statusOptions.comingSoon}</option>
              </select>
            </div> */}

            {/* District Filter */}
            {/* <div className={styles.filter__group}>
              <label className={styles.filter__label}>{t.district}</label>
              <select
                className={styles.filter__select}
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
              >
                <option value="">{t.all}</option>
                <option value="riyadh">{t.districtOptions.riyadh}</option>
                <option value="jeddah">{t.districtOptions.jeddah}</option>
                <option value="dammam">{t.districtOptions.dammam}</option>
                <option value="khobar">{t.districtOptions.khobar}</option>
              </select>
            </div> */}

            {/* City Filter */}
            {/* <div className={styles.filter__group}>
              <label className={styles.filter__label}>{t.city}</label>
              <select
                className={styles.filter__select}
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">{t.all}</option>
                <option value="north">{t.cityOptions.north}</option>
                <option value="south">{t.cityOptions.south}</option>
                <option value="east">{t.cityOptions.east}</option>
                <option value="west">{t.cityOptions.west}</option>
              </select>
            </div> */}

            {/* Area Filter */}
            {/* <div className={styles.filter__group}>
              <label className={styles.filter__label}>{t.area}</label>
              <select
                className={styles.filter__select}
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
              >
                <option value="">{t.all}</option>
                <option value="olaya">{t.areaOptions.olaya}</option>
                <option value="malqa">{t.areaOptions.malqa}</option>
                <option value="sulaimaniya">{t.areaOptions.sulaimaniya}</option>
                <option value="sahafa">{t.areaOptions.sahafa}</option>
              </select>
            </div> */}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className={styles.filter__group}>
                <label className={styles.filter__label} style={{ opacity: 0 }}>Actions</label>
                <button
                  className={styles.filter__clear}
                  onClick={clearAllFilters}
                >
                  <X size={16} />
                  <span>{t.clearFilters}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count - Desktop */}
        <div className={styles.filter__results_desktop}>
          {filteredCount > 0 ? t.showingResults : t.noResults}
        </div>
      </div>
    </div>
  );
};




export default ProjectFilter;
