import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building, Calendar, Heart } from 'lucide-react';
import styles from '../../../styles/components/home/FeaturedProjects.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useFavorites } from '../../../contexts/useFavorites';
import Toast from '../common/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { getProjectsAPi, Project } from '../../../store/slices/ProjectSlice';
import ProjectCardSkeleton from '../shared/ProjectCardSkeleton';
import { useAuth } from '../../../contexts';

const FeaturedProjects: React.FC = () => {
  //#region Code
  const { currentLanguage } = useLanguage();
  const {
    isProjectFavorited,
    addProjectToFavorites,
    removeProjectFromFavorites,
    favoriteUnits,
    favoriteProjects,
    isLoading: favoriteProjectsLoading
  } = useFavorites();
  const { user, isAuthenticated } = useAuth();

  const isArabic = currentLanguage.code === 'ar';
  const navigate = useNavigate();
  const [toast, setToast] = React.useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  // بيانات المشاريع - 6 مشاريع ثابتة
  // const projects = [

  //   {
  //     "id": 77,
  //     "nameAr": "مشروع فاخر",
  //     "nameEn": "Corwin - Murphy",
  //     "descriptionAr": "موقع ممتاز ومساحة واسعة.",
  //     "descriptionEn": "Sequi fugit dolore aperiam. Nostrum et pariatur. Perspiciatis ipsum dignissimos. Beatae maxime nesciunt.",
  //     "locationAr": "Port Nathan",
  //     "locationEn": "South Juvenalchester",
  //     "statusId": 1,
  //     "statusName": "نشط",
  //     "statusNameEn": "Active",
  //     "estimatedCompletionDate": "2026-11-17",
  //     "countOfUnits": 0,
  //     "mainImageUrl": "",
  //   },
  //   {
  //     id: 1,
  //     slug: 'yasmin-residential-complex',
  //     title: isArabic ? 'مجمع الياسمين السكني' : 'Yasmin Residential Complex',
  //     location: isArabic ? 'شمال الرياض' : 'North Riyadh',
  //     status: isArabic ? 'قيد الإنشاء' : 'Under Construction',
  //     completion: isArabic ? '2025' : '2025',
  //     units: 120,
  //     image: 'https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562'
  //   },
  //   {
  //     id: 2,
  //     slug: 'palm-tower-commercial',
  //     title: isArabic ? 'برج النخيل التجاري' : 'Palm Tower Commercial',
  //     location: isArabic ? 'وسط جدة' : 'Central Jeddah',
  //     status: isArabic ? 'مكتمل' : 'Completed',
  //     completion: isArabic ? '2024' : '2024',
  //     units: 80,
  //     image: 'https://www.shutterstock.com/image-photo/cityscape-residential-area-modern-apartment-600nw-1723278520.jpg'
  //   },
  //   {
  //     id: 3,
  //     slug: 'smart-business-city',
  //     title: isArabic ? 'مدينة الأعمال الذكية' : 'Smart Business City',
  //     location: isArabic ? 'شرق الدمام' : 'East Dammam',
  //     status: isArabic ? 'قيد التخطيط' : 'Planning Phase',
  //     completion: isArabic ? '2026' : '2026',
  //     units: 200,
  //     image: 'https://normarch.com/wp-content/uploads/2018/05/thumb_X-ARCHITECTURE-aaaaa-La-Vista-Compound-north-coast-QU-N.RGB_color.0000.jpg.jpg.jpg'
  //   },
  //   {
  //     id: 4,
  //     slug: 'rose-family-village',
  //     title: isArabic ? 'قرية الورود العائلية' : 'Rose Family Village',
  //     location: isArabic ? 'غرب الرياض' : 'West Riyadh',
  //     status: isArabic ? 'قيد الإنشاء' : 'Under Construction',
  //     completion: isArabic ? '2025' : '2025',
  //     units: 150,
  //     image: 'https://www.omranarch.com/storage/projects/2014/1442-muhaidib-family-compound/2.jpg'
  //   },
  //   {
  //     id: 5,
  //     slug: 'diamond-commercial-center',
  //     title: isArabic ? 'مركز الماس التجاري' : 'Diamond Commercial Center',
  //     location: isArabic ? 'شمال جدة' : 'North Jeddah',
  //     status: isArabic ? 'متاح للبيع' : 'Available for Sale',
  //     completion: isArabic ? '2024' : '2024',
  //     units: 60,
  //     image: 'https://ideal-architects.com/data/77/2116/15721673489652.jpg'
  //   },
  //   {
  //     id: 6,
  //     slug: 'andalus-luxury-complex',
  //     title: isArabic ? 'مجمع الأندلس الفاخر' : 'Andalus Luxury Complex',
  //     location: isArabic ? 'جنوب الرياض' : 'South Riyadh',
  //     status: isArabic ? 'قيد الإنشاء' : 'Under Construction',
  //     completion: isArabic ? '2026' : '2026',
  //     units: 90,
  //     image: 'https://ideal-architects.com/data/77/2116/15721674722493.JPG'
  //   }
  // ];

  const content = {
    en: {
      subtitle: 'Our Portfolio',
      title: 'Featured Projects',
      description: 'Explore our exceptional development projects that set new standards in luxury and innovation.',
      units: 'Units',
      viewDetails: 'View Details',
      exploreProjects: 'Explore Our Projects',
      favoriteAdded: 'Project added to favorites!',
      favoriteRemoved: 'Project removed from favorites!',
      noProjects: "No Projects Added Yet",
      errorFetch: "Something Went Bad! Try Again Later",
    },
    ar: {
      subtitle: 'أعمالنا',
      title: 'المشاريع المميزة',
      description: 'اكتشف مشاريعنا التطويرية الاستثنائية التي تضع معايير جديدة في الفخامة والابتكار.',
      units: 'وحدة',
      viewDetails: 'عرض التفاصيل',
      exploreProjects: 'استكشف مشاريعنا',
      favoriteAdded: 'تم إضافة المشروع للمفضلة!',
      favoriteRemoved: 'تم إزالة المشروع من المفضلة!',
      noProjects: "لم يتم اضافة مشاريع جديدة بعد",
      errorFetch: "حدث خطاء اثناء جلب البيانات , حاول مجددا لاجقا ",


    }
  };

  const t = isArabic ? content.ar : content.en;

  const handleProjectClick = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const handleExploreClick = () => {
    navigate('/projects');
  };

  const handleFavoriteToggle = async (projectId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const isCurrentlyFavorited = isProjectFavorited(projectId);

    try {
      if (isCurrentlyFavorited) {
        await removeProjectFromFavorites(projectId);
      } else {
        await addProjectToFavorites(projectId);
      }
    } catch (error) {
      // Error is already handled by the context and toast is shown
      console.error('Error toggling favorite:', error);
    }
  };

  const closeToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };
  //#endregion Code

  // #region Api Fetch Data

  const { projects: {
    data, loading, error
  } } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();



  const AuthAndFetchData = () => {
    // if the user is auth , if the fave apis loading is false , then dispatch project , 
    // if user is not auth , dispatch project direct 
    if (isAuthenticated) {
      !favoriteProjectsLoading && dispatch(getProjectsAPi({
        IsActive: true,
        IsFeatured: true
      }));
    } else {
      dispatch(getProjectsAPi({
          IsActive: true,
          IsFeatured: true
      }));
  }
}


useEffect(() => {
  AuthAndFetchData()
}, [isAuthenticated]);



useEffect(() => {
  !loading && data?.items?.length !== 0 && console.log("Fetch Data ", data);
  console.log(error);

}, [data]);





// #endregion Api Fetch Data 


return (
  <section className={styles.featured} dir={isArabic ? 'rtl' : 'ltr'}>
    {/* Toast Notification */}
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.show}
      onClose={closeToast}
    />

    <div className={styles.featured__container}>
      {/* Section Header */}
      <div className={styles.featured__header}>
        <div className={styles.featured__subtitle}>
          {t.subtitle}
        </div>
        <h2 className={styles.featured__title}>
          {t.title}
        </h2>
        <p className={styles.featured__description}>
          {t.description}
        </p>
      </div>

      {loading ? <>
        <div className={styles.featured__grid}>
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </> : error !== null ? <>
        <p style={{ textAlign: "center", fontSize: "2rem" }}>{t.errorFetch} </p>
      </> :
        data && data?.items && data?.items?.length !== 0 ?
          <>
            <div className={styles.featured__grid}>
              {data.items.map((project: Project) => (
                <HomeProjectCard
                  handleFavoriteToggle={handleFavoriteToggle}
                  handleProjectClick={handleProjectClick}
                  isProjectFavorited={isProjectFavorited}
                  project={project}
                  key={project.id}
                  t={t}
                  language={isArabic ? "AR" : "EN"}
                />
              ))}
            </div>
            < div className={styles.featured__cta}>
              <button
                className={styles.featured__explore_btn}
                onClick={handleExploreClick}
              >
                {t.exploreProjects}
              </button>
            </div>
          </>
          : <>
            <p style={{ textAlign: "center", fontSize: "2rem" }}>{t.noProjects} </p>
          </>
      }
    </div>
  </section >
);
};


interface contentInterface {
  subtitle: string,
  title: string,
  description: string,
  units: string,
  viewDetails: string,
  exploreProjects: string,
  favoriteAdded: string,
  favoriteRemoved: string

}


interface HomeProjectCardProps {
  project: Project,
  language: string,
  t: contentInterface,
  isProjectFavorited: (projectId: number) => boolean,
  handleProjectClick: (slug: string) => void,
  handleFavoriteToggle: (projectId: number, event: React.MouseEvent) => void
}


const HomeProjectCard: React.FC<HomeProjectCardProps> = ({ project, t, language, isProjectFavorited, handleFavoriteToggle, handleProjectClick }) => {
  return <>
    <div
      className={styles.featured__card}
      onClick={() => handleProjectClick(`${project.id}`)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div className={styles["featured__card-image"]}>
        <img
          src={project.mainImageUrl}
          alt={project.nameEn}
        />

        {/* Status Badge */}
        <div className={styles["featured__card-status"]}>
          {language === "AR" ? project.statusName : project.statusNameEn}

        </div>

        {/* Favorite Button */}
        <button
          className={`${styles["featured__card-favorite"]} ${isProjectFavorited(project.id) ? styles["featured__card-favorite_active"] : ''}`}
          onClick={(e) => handleFavoriteToggle(project.id, e)}
          title={isProjectFavorited(project.id) ? t.favoriteRemoved : t.favoriteAdded}
        >
          <Heart
            size={20}
            fill={isProjectFavorited(project.id) ? '#FBBF24' : 'none'}
          />
        </button>
      </div>

      {/* Content */}
      <div className={styles["featured__card-content"]}>
        {/* Title - محدود بـ 2 سطر */}
        <h3 className={styles["featured__card-title"]}>
          {language === "AR" ? project.nameAr : project.nameEn}
        </h3>

        {/* Location */}
        <div className={styles["featured__card-location"]}>
          <MapPin size={16} />
          <span>{language === "AR" ? project.locationAr : project.locationEn}</span>
        </div>

        {/* Info Row */}
        <div className={styles["featured__card-info"]}>
          <div className={styles["featured__card-detail"]}>
            <Building size={14} />
            <span>{project.countOfUnits} {t.units}</span>
          </div>
          <div className={styles["featured__card-detail"]}>
            <Calendar size={14} />
            <span>{project.estimatedCompletionDate}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className={styles["featured__card-button"]}>
          {t.viewDetails}
        </button>
      </div>
    </div>

  </>
}




export default FeaturedProjects;
