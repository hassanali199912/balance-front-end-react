import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Heart, Eye, Lock, Edit3, Save, X } from 'lucide-react';
import { useLanguage, useAuth, useToast } from '../../contexts';
import { useFavorites } from '../../contexts/useFavorites';
import { authAPI } from '../../services/authAPI';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import PropertyCard from '../../components/ui/dashboard/PropertyCard';
import styles from '../../styles/components/dashboard/Profile.module.css';

interface EditUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
  location: string;
}

interface ProfileProperty {
  id: string;
  title: string;
  titleAr: string;
  price: number;
  location: string;
  locationAr: string;
  image: string;
  type: 'apartment' | 'villa' | 'office' | 'land';
  area: number;
}

interface ContentType {
  profile: string;
  favorites: string;
  interests: string;
  changePassword: string;
  editProfile: string;
  saveChanges: string;
  cancel: string;
  personalInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp: string;
  bio: string;
  location: string;
  memberSince: string;
  myFavorites: string;
  myInterests: string;
  noFavorites: string;
  noInterests: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  updatePassword: string;
  placeholders: {
    firstName: string;
    lastName: string;
    phone: string;
    whatsapp: string;
    bio: string;
    location: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  validation: {
    profileUpdated: string;
    passwordUpdated: string;
    updateError: string;
    passwordMismatch: string;
    passwordRequired: string;
    passwordTooShort: string;
  };
  currency: string;
  sqm: string;
}

const ProfilePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { user, updateUser, changePassword, logout, refreshUserData, loading } = useAuth();
  const {
    favoriteProjects,
    favoriteUnits,
    totalFavoriteProjects,
    totalFavoriteUnits,
    isLoading: favoritesLoading,
    removeProjectFromFavorites,
    removeUnitFromFavorites,
    refreshFavorites,
    // Interested
    interestedProjects,
    interestedUnits,
    totalCountInterestedProjects,
    totalCountInterestedUnites,
    isInterestedLoading,
    interestedError,
    refreshInterested,
    removeUnitFromInterested,
    removeProjectFromInterested

  } = useFavorites();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isArabic = currentLanguage.code === 'ar';

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  // Initialize editData with user data and localStorage data
  const [editData, setEditData] = useState<EditUserData>(() => {
    try {
      const savedProfile = localStorage.getItem('userProfile');
      const savedData = savedProfile ? JSON.parse(savedProfile) : {};

      return {
        firstName: user?.firstName || savedData.firstName || '',
        lastName: user?.lastName || savedData.lastName || '',
        email: user?.email || savedData.email || '',
        phone: user?.phoneNumber || savedData.phone || '',
        whatsapp: savedData.whatsapp || '',
        bio: savedData.bio || '',
        location: savedData.location || ''
      };
    } catch {
      // If there's an error parsing localStorage, use default values
      return {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
        whatsapp: '',
        bio: '',
        location: ''
      };
    }
  });

  // Get initial tab from URL params or default to 'profile'
  const initialTab = (searchParams.get('tab') as 'profile' | 'favorites' | 'interests' | 'password') || 'profile';
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'interests' | 'password'>(initialTab);

  // Handle tab changes and update URL
  const handleTabChange = (tab: 'profile' | 'favorites' | 'interests' | 'password') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Update activeTab when URL changes
  useEffect(() => {
    const urlTab = searchParams.get('tab') as 'profile' | 'favorites' | 'interests' | 'password';
    if (urlTab && ['profile', 'favorites', 'interests', 'password'].includes(urlTab)) {
      setActiveTab(urlTab);
    }
  }, [searchParams]);
  const [favoritesFilter, setFavoritesFilter] = useState<'all' | 'projects' | 'properties'>('all');
  const [interestsFilter, setInterestsFilter] = useState<'all' | 'projects' | 'properties'>('all');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  // Form validation state
  const [formValidation, setFormValidation] = useState({
    firstName: { isValid: true, message: '' },
    lastName: { isValid: true, message: '' },
    phone: { isValid: true, message: '' },
    whatsapp: { isValid: true, message: '' },
    bio: { isValid: true, message: '' },
    location: { isValid: true, message: '' }
  });

  // Load favorites when component mounts
  useEffect(() => {
    if (user?.id) {
      refreshFavorites();
      refreshInterested()
    }
  }, [user?.id, refreshFavorites, refreshInterested]);


  // Sync edit data with user data when user changes
  useEffect(() => {
    if (user) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        whatsapp: user.whatsAppNumber || '',
        bio: user.bio || '',
        location: user.location || ''
      });
    }
  }, [user]);

  const content = {
    en: {
      profile: 'Profile',
      favorites: 'Favorites',
      interests: 'Interests',
      changePassword: 'Change Password',
      all: 'All',
      projects: 'Projects',
      properties: 'Properties',
      editProfile: 'Edit Profile',
      saveChanges: 'Save Changes',
      cancel: 'Cancel',
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      whatsapp: 'WhatsApp Number',
      bio: 'Bio',
      location: 'Location',
      memberSince: 'Member Since',
      myFavorites: 'My Favorites',
      myInterests: 'My Interests',
      noFavorites: 'No favorites yet',
      noInterests: 'No interests yet',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      updatePassword: 'Update Password',
      placeholders: {
        firstName: 'Enter your first name',
        lastName: 'Enter your last name',
        phone: 'Enter your phone number',
        whatsapp: 'Enter your WhatsApp number',
        bio: 'Tell us about yourself',
        location: 'Enter your location',
        currentPassword: 'Enter current password',
        newPassword: 'Enter new password',
        confirmPassword: 'Confirm new password'
      },
      validation: {
        profileUpdated: 'Profile updated successfully',
        passwordUpdated: 'Password updated successfully',
        updateError: 'Failed to update. Please try again.',
        passwordMismatch: 'Passwords do not match',
        passwordRequired: 'All password fields are required',
        passwordTooShort: 'Password must be at least 8 characters'
      },
      passwordHints: {
        title: 'Password Requirements:',
        minLength: 'At least 8 characters',
        hasUppercase: 'At least one uppercase letter (A-Z)',
        hasLowercase: 'At least one lowercase letter (a-z)',
        hasNumber: 'At least one number (0-9)',
        hasSpecial: 'At least one special character (!@#$%^&*)'
      },
      currency: 'SAR',
      sqm: 'sqm'
    },
    ar: {
      profile: 'الملف الشخصي',
      favorites: 'المفضلة',
      interests: 'الاهتمامات',
      changePassword: 'تغيير كلمة المرور',
      all: 'الكل',
      projects: 'المشاريع',
      properties: 'العقارات',
      editProfile: 'تعديل الملف الشخصي',
      saveChanges: 'حفظ التغييرات',
      cancel: 'إلغاء',
      personalInfo: 'المعلومات الشخصية',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      whatsapp: 'رقم الواتساب',
      bio: 'نبذة شخصية',
      location: 'الموقع',
      memberSince: 'عضو منذ',
      myFavorites: 'مفضلاتي',
      myInterests: 'اهتماماتي',
      noFavorites: 'لا توجد مفضلات بعد',
      noInterests: 'لا توجد اهتمامات بعد',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور الجديدة',
      updatePassword: 'تحديث كلمة المرور',
      placeholders: {
        firstName: 'أدخل اسمك الأول',
        lastName: 'أدخل اسم العائلة',
        phone: 'أدخل رقم هاتفك',
        whatsapp: 'أدخل رقم الواتساب',
        bio: 'أخبرنا عن نفسك',
        location: 'أدخل موقعك',
        currentPassword: 'أدخل كلمة المرور الحالية',
        newPassword: 'أدخل كلمة المرور الجديدة',
        confirmPassword: 'أكد كلمة المرور الجديدة'
      },
      validation: {
        profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
        passwordUpdated: 'تم تحديث كلمة المرور بنجاح',
        updateError: 'فشل في التحديث. يرجى المحاولة مرة أخرى.',
        passwordMismatch: 'كلمات المرور غير متطابقة',
        passwordRequired: 'جميع حقول كلمة المرور مطلوبة',
        passwordTooShort: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل'
      },
      passwordHints: {
        title: 'متطلبات كلمة المرور:',
        minLength: '8 أحرف على الأقل',
        hasUppercase: 'حرف كبير واحد على الأقل (A-Z)',
        hasLowercase: 'حرف صغير واحد على الأقل (a-z)',
        hasNumber: 'رقم واحد على الأقل (0-9)',
        hasSpecial: 'رمز خاص واحد على الأقل (!@#$%^&*)'
      },
      currency: 'ريال',
      sqm: 'م²'
    }
  };

  const t = isArabic ? content.ar : content.en;

  // Field validation functions
  const validateField = (field: keyof EditUserData, value: string) => {
    let isValid = true;
    let message = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          isValid = false;
          message = isArabic ? 'هذا الحقل مطلوب' : 'This field is required';
        } else if (value.trim().length < 2) {
          isValid = false;
          message = isArabic ? 'يجب أن يكون حرفين على الأقل' : 'Must be at least 2 characters';
        }
        break;
      case 'phone':
      case 'whatsapp':
        if (value && !/^[+]?[\d\s\-()]+$/.test(value)) {
          isValid = false;
          message = isArabic ? 'رقم هاتف غير صحيح' : 'Invalid phone number';
        }
        break;
      case 'bio':
        if (value && value.length > 500) {
          isValid = false;
          message = isArabic ? 'السيرة الذاتية طويلة جداً (500 حرف كحد أقصى)' : 'Bio is too long (500 characters max)';
        }
        break;
    }

    setFormValidation(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));

    return isValid;
  };

  const handleInputChange = (field: keyof EditUserData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));

    // Validate new password in real-time
    if (field === 'newPassword') {
      setPasswordValidation({
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !updateUser) return;

    setIsSaving(true);
    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData();
      formData.append('FirstName', editData.firstName);
      formData.append('LastName', editData.lastName);
      formData.append('PhoneNumber', editData.phone);
      formData.append('Bio', editData.bio);
      formData.append('Location', editData.location);
      formData.append('WhatsAppNumber', editData.whatsapp);

      // Get user's public IP
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        formData.append('PublicIp', ipData.ip);
      } catch {
        // IP fetch failed, continue without it
      }

      await updateUser(formData);

      // Refresh user data from server
      setIsRefreshing(true);
      try {
        await refreshUserData();
      } catch (error) {
        console.log('Failed to refresh user data:', error);
      } finally {
        setIsRefreshing(false);
      }

      setIsEditing(false);
      // Toast is handled by AuthContext.updateUser
    } catch (error) {
      // Error toast is handled by AuthContext.updateUser
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('error', t.validation.passwordMismatch);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showToast('error', t.validation.passwordTooShort);
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword({
        email: user?.email || '',
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmPassword
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      showToast(
        'success',
        isArabic
          ? 'تم تغيير كلمة المرور بنجاح. سيتم تسجيل الخروج الآن'
          : 'Password changed successfully. You will be logged out now'
      );

      // Wait a moment for the toast to show, then logout and redirect
      setTimeout(async () => {
        await logout();
        navigate('/signin');
      }, 2000);

    } catch (error) {
      showToast('error', t.validation.updateError);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      const savedProfile = localStorage.getItem('userProfile');
      const savedData = savedProfile ? JSON.parse(savedProfile) : {};

      setEditData({
        firstName: user.firstName || savedData.firstName || '',
        lastName: user.lastName || savedData.lastName || '',
        email: user.email || savedData.email || '',
        phone: user.phoneNumber || savedData.phone || '',
        whatsapp: savedData.whatsapp || '',
        bio: savedData.bio || '',
        location: savedData.location || ''
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isArabic
      ? date.toLocaleDateString('ar-SA')
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatPrice = (price: number) => {
    return isArabic
      ? `${price.toLocaleString('ar-SA')} ${t.currency}`
      : `${price.toLocaleString('en-US')} ${t.currency}`;
  };

  const getFilteredItems = (items: ProfileProperty[], filter: string) => {
    if (filter === 'all') return items;
    if (filter === 'projects') return items.filter(item => item.type === 'villa');
    if (filter === 'properties') return items.filter(item => item.type !== 'villa');
    return items;
  };
  const renderPropertyCard = (property: ProfileProperty) => (
    <div key={property.id} className={styles.profile__property_card}>
      <div className={styles.profile__property_image}>
        <img
          src={property.image}
          alt={isArabic ? property.titleAr : property.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder-property.jpg';
          }}
        />
      </div>
      <div className={styles.profile__property_info}>
        <h3 className={styles.profile__property_title}>
          {isArabic ? property.titleAr : property.title}
        </h3>
        <p className={styles.profile__property_location}>
          {isArabic ? property.locationAr : property.location}
        </p>
        <div className={styles.profile__property_details}>
          <span className={styles.profile__property_price}>
            {formatPrice(property.price)}
          </span>
          <span className={styles.profile__property_area}>
            {property.area} {t.sqm}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.profile} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.profile__container}>
        {/* Header */}
        <div className={styles.profile__header}>
          <div className={styles.profile__avatar}>
            {user?.profilePictureUrl ? (
              <img src={user.profilePictureUrl} alt="Profile" />
            ) : (
              <User size={40} />
            )}
          </div>
          <div className={styles.profile__user_info}>
            <h1 className={styles.profile__name}>
              {user?.firstName} {user?.lastName}
            </h1>
            <p className={styles.profile__email}>{user?.email}</p>
            <p className={styles.profile__member_since}>
              {t.memberSince}: {user?.lastLoginAt ? formatDate(user.lastLoginAt) : 'N/A'}
            </p>
          </div>
          {activeTab === 'profile' && (
            <div className={styles.profile__actions}>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className={styles.profile__edit_btn}
                >
                  <Edit3 size={16} />
                  {t.editProfile}
                </button>
              ) : (
                <div className={styles.profile__edit_actions}>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className={styles.profile__save_btn}
                  >
                    <Save size={16} />
                    {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : t.saveChanges}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className={styles.profile__cancel_btn}
                  >
                    <X size={16} />
                    {t.cancel}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className={styles.profile__nav}>
          <button
            onClick={() => handleTabChange('profile')}
            className={`${styles.profile__nav_btn} ${activeTab === 'profile' ? styles.active : ''}`}
          >
            <User size={16} />
            {t.profile}
          </button>
          <button
            onClick={() => handleTabChange('favorites')}
            className={`${styles.profile__nav_btn} ${activeTab === 'favorites' ? styles.active : ''}`}
          >
            <Heart size={16} />
            {t.favorites}
            {(totalFavoriteProjects + totalFavoriteUnits) > 0 && (
              <span className={styles.profile__badge}>
                {totalFavoriteProjects + totalFavoriteUnits}
              </span>
            )}
          </button>
          <button
            onClick={() => handleTabChange('interests')}
            className={`${styles.profile__nav_btn} ${activeTab === 'interests' ? styles.active : ''}`}
          >
            <Eye size={16} />
            {t.interests}
          </button>
          {user && !('isThirdPartyAuth' in user && user.isThirdPartyAuth) && (
            <button
              onClick={() => handleTabChange('password')}
              className={`${styles.profile__nav_btn} ${activeTab === 'password' ? styles.active : ''}`}
            >
              <Lock size={16} />
              {t.changePassword}
            </button>
          )}
        </div>

        {/* Content */}
        <div className={styles.profile__content}>
          {activeTab === 'profile' && (
            <ProfileTab
              user={user}
              editData={editData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
              t={t}
              isArabic={isArabic}
            />
          )}

          {activeTab === 'favorites' && (
            <div className={styles.profile__tab_content}>
              <h2 className={styles.profile__section_title}>{t.myFavorites}</h2>

              {favoritesLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {/* Favorite Projects Section */}
                  <div className={styles.profile__favorites_section}>
                    <h3 className={styles.profile__section_subtitle}>
                      {t.projects} ({totalFavoriteProjects})
                    </h3>
                    {favoriteProjects.length > 0 ? (
                      <div className={styles.profile__properties_grid}>
                        {favoriteProjects.map((project) => (
                          <PropertyCard
                            key={project.projectId}
                            id={project.projectId}
                            title={isArabic ? project.nameAr : project.nameEn}
                            location={isArabic ? project.location : project.location}
                            price={isArabic ? project.price : project.price}
                            image={project.mainImageUrl}
                            type="project"
                            onRemove={removeProjectFromFavorites}
                            viewUrl={`/projects/${project.projectId || project.projectId}`}
                            isArabic={isArabic}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={styles.profile__empty_state}>
                        <Heart size={48} />
                        <p>{isArabic ? 'لا توجد مشاريع مفضلة' : 'No favorite projects'}</p>
                      </div>
                    )}
                  </div>

                  {/* Favorite Units Section */}
                  <div className={styles.profile__favorites_section}>
                    <h3 className={styles.profile__section_subtitle}>
                      {t.properties} ({totalFavoriteUnits})
                    </h3>
                    {favoriteUnits.length > 0 ? (
                      <div className={styles.profile__properties_grid}>
                        {favoriteUnits.map((unit) => (
                          <PropertyCard
                            key={unit.unitId}
                            id={unit.unitId}
                            title={isArabic ? unit.nameAr : unit.nameEn}
                            location={isArabic ? unit.location : unit.location}
                            price={unit.price}
                            area={0}
                            image={unit.mainImageUrl}
                            type="unit"
                            onRemove={removeUnitFromFavorites}
                            viewUrl={`/properties/${unit.unitId}`}
                            isArabic={isArabic}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={styles.profile__empty_state}>
                        <Heart size={48} />
                        <p>{isArabic ? 'لا توجد عقارات مفضلة' : 'No favorite properties'}</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'interests' && (
            <div className={styles.profile__tab_content}>
              <h2 className={styles.profile__section_title}>{t.myInterests}</h2>

              {/* Filter Tabs */}
              {/* <div className={styles.profile__filter_tabs}>
                <button
                  className={`${styles.profile__filter_tab} ${interestsFilter === 'all' ? styles.active : ''}`}
                  onClick={() => setInterestsFilter('all')}
                >
                  {t.all}
                </button>
                <button
                  className={`${styles.profile__filter_tab} ${interestsFilter === 'projects' ? styles.active : ''}`}
                  onClick={() => setInterestsFilter('projects')}
                >
                  {t.projects}
                </button>
                <button
                  className={`${styles.profile__filter_tab} ${interestsFilter === 'properties' ? styles.active : ''}`}
                  onClick={() => setInterestsFilter('properties')}
                >
                  {t.properties}
                </button>
              </div> */}
              {isInterestedLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {/* Intersted Projects Section */}
                  <div className={styles.profile__favorites_section}>
                    <h3 className={styles.profile__section_subtitle}>
                      {t.projects} ({totalCountInterestedProjects})
                    </h3>
                    {interestedProjects.length > 0 ? (
                      <div className={styles.profile__properties_grid}>
                        {interestedProjects.map((project) => (
                          <PropertyCard
                            key={project.projectId}
                            id={project.projectId}
                            title={isArabic ? project.projectNameAr : project.projectNameEn}
                            location={isArabic ? project.locationAr : project.locationEn}
                            price={isArabic ? project.price : project.price}
                            image={project.mainImageUrl}
                            type="project"
                            onRemove={removeProjectFromInterested}
                            viewUrl={`/projects/${project.projectId || project.projectId}`}
                            isArabic={isArabic}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={styles.profile__empty_state}>
                        <Heart size={48} />
                        <p>{isArabic ? 'لا توجد مشاريع مهتمة' : 'No Interested projects'}</p>
                      </div>
                    )}
                  </div>

                  {/* Intersted Units Section */}
                  <div className={styles.profile__favorites_section}>
                    <h3 className={styles.profile__section_subtitle}>
                      {t.properties} ({totalCountInterestedUnites})
                    </h3>
                    {interestedUnits.length > 0 ? (
                      <div className={styles.profile__properties_grid}>
                        {interestedUnits.map((unit) => (
                          <PropertyCard
                            key={unit.unitId}
                            id={unit.unitId}
                            title={isArabic ? unit.unitTitleAr : unit.unitTitleEn}
                            location={isArabic ? unit.locationAr : unit.locationEn}
                            price={unit.price}
                            area={0}
                            image={unit.mainImageUrl}
                            type="unit"
                            onRemove={removeUnitFromInterested}
                            viewUrl={`/properties/${unit.unitId}`}
                            isArabic={isArabic}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className={styles.profile__empty_state}>
                        <Heart size={48} />
                        <p>{isArabic ? 'لا توجد عقارات مهتمة' : 'No Interested properties'}</p>
                      </div>
                    )}
                  </div>
                </>
              )}


              {/* {getFilteredItems(interests, interestsFilter).length > 0 ? (
                <div className={styles.profile__properties_grid}>
                  {getFilteredItems(interests, interestsFilter).map(renderPropertyCard)}
                </div>
              ) : (
                <div className={styles.profile__empty_state}>
                  <Eye size={48} />
                  <p>{t.noInterests}</p>
                </div>
              )} */}
            </div>
          )}

          {activeTab === 'password' && (
            <div className={styles.profile__tab_content}>
              <h2 className={styles.profile__section_title}>{t.changePassword}</h2>
              <div className={styles.profile__form}>
                <div className={styles.profile__form_group}>
                  <label className={styles.profile__label}>{t.currentPassword}</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder={t.placeholders.currentPassword}
                    className={styles.profile__input}
                  />
                </div>

                <div className={styles.profile__form_group}>
                  <label className={styles.profile__label}>{t.newPassword}</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder={t.placeholders.newPassword}
                    className={styles.profile__input}
                  />
                </div>

                {/* Password Hints */}
                {passwordData.newPassword && (
                  <div className={styles.profile__password_hints}>
                    <h4 className={styles.profile__hints_title}>{t.passwordHints.title}</h4>
                    <div className={styles.profile__hints_grid}>
                      <div className={`${styles.profile__hint} ${passwordValidation.minLength ? styles.profile__hint_valid : styles.profile__hint_invalid}`}>
                        <span className={styles.profile__hint_icon}>
                          {passwordValidation.minLength ? '✓' : '✗'}
                        </span>
                        <span>{t.passwordHints.minLength}</span>
                      </div>
                      <div className={`${styles.profile__hint} ${passwordValidation.hasUppercase ? styles.profile__hint_valid : styles.profile__hint_invalid}`}>
                        <span className={styles.profile__hint_icon}>
                          {passwordValidation.hasUppercase ? '✓' : '✗'}
                        </span>
                        <span>{t.passwordHints.hasUppercase}</span>
                      </div>
                      <div className={`${styles.profile__hint} ${passwordValidation.hasLowercase ? styles.profile__hint_valid : styles.profile__hint_invalid}`}>
                        <span className={styles.profile__hint_icon}>
                          {passwordValidation.hasLowercase ? '✓' : '✗'}
                        </span>
                        <span>{t.passwordHints.hasLowercase}</span>
                      </div>
                      <div className={`${styles.profile__hint} ${passwordValidation.hasNumber ? styles.profile__hint_valid : styles.profile__hint_invalid}`}>
                        <span className={styles.profile__hint_icon}>
                          {passwordValidation.hasNumber ? '✓' : '✗'}
                        </span>
                        <span>{t.passwordHints.hasNumber}</span>
                      </div>
                      <div className={`${styles.profile__hint} ${passwordValidation.hasSpecial ? styles.profile__hint_valid : styles.profile__hint_invalid}`}>
                        <span className={styles.profile__hint_icon}>
                          {passwordValidation.hasSpecial ? '✓' : '✗'}
                        </span>
                        <span>{t.passwordHints.hasSpecial}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.profile__form_group}>
                  <label className={styles.profile__label}>{t.confirmPassword}</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder={t.placeholders.confirmPassword}
                    className={styles.profile__input}
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className={styles.profile__save_btn}
                >
                  <Lock size={16} />
                  {t.updatePassword}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && <LoadingSpinner fullScreen />}
    </div>
  );
};

// Profile Tab Component
interface ProfileTabProps {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    isThirdPartyAuth?: boolean;
  } | null;
  editData: EditUserData;
  isEditing: boolean;
  onInputChange: (field: keyof EditUserData, value: string) => void;
  t: ContentType;
  isArabic: boolean;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  editData,
  isEditing,
  onInputChange,
  t,
  isArabic
}) => (
  <div className={styles.profile__tab_content}>
    <h2 className={styles.profile__section_title}>{t.personalInfo}</h2>
    <div className={styles.profile__form}>
      <div className={styles.profile__form_row}>
        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.firstName}</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              placeholder={t.placeholders.firstName}
              className={styles.profile__input}
            />
          ) : (
            <p className={styles.profile__value}>{user?.firstName}</p>
          )}
        </div>
        <div className={styles.profile__form_group}>
          <label className={styles.profile__label}>{t.lastName}</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              placeholder={t.placeholders.lastName}
              className={styles.profile__input}
            />
          ) : (
            <p className={styles.profile__value}>{user?.lastName}</p>
          )}
        </div>
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.email}</label>
        <p className={styles.profile__value}>{user?.email}</p>
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.phone}</label>
        {isEditing ? (
          <input
            type="tel"
            value={editData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            placeholder={t.placeholders.phone}
            className={styles.profile__input}
          />
        ) : (
          <p className={styles.profile__value}>{user?.phoneNumber}</p>
        )}
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.whatsapp}</label>
        {isEditing ? (
          <input
            type="tel"
            value={editData.whatsapp}
            onChange={(e) => onInputChange('whatsapp', e.target.value)}
            placeholder={t.placeholders.whatsapp}
            className={styles.profile__input}
          />
        ) : (
          <p className={styles.profile__value}>{editData.whatsapp || '-'}</p>
        )}
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.bio}</label>
        {isEditing ? (
          <textarea
            value={editData.bio || ''}
            onChange={(e) => onInputChange('bio', e.target.value)}
            placeholder={t.placeholders.bio}
            className={styles.profile__textarea}
            rows={3}
          />
        ) : (
          <p className={styles.profile__value}>{editData.bio || (isArabic ? 'غير محدد' : 'Not specified')}</p>
        )}
      </div>

      <div className={styles.profile__form_group}>
        <label className={styles.profile__label}>{t.location}</label>
        {isEditing ? (
          <input
            type="text"
            value={editData.location || ''}
            onChange={(e) => onInputChange('location', e.target.value)}
            placeholder={t.placeholders.location}
            className={styles.profile__input}
          />
        ) : (
          <p className={styles.profile__value}>{editData.location || (isArabic ? 'غير محدد' : 'Not specified')}</p>
        )}
      </div>
    </div>
  </div>
);

export default ProfilePage;
