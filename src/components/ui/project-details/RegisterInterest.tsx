import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send, Calendar, Users, CheckCircle } from 'lucide-react';
import styles from '../../../styles/components/project-details/RegisterInterest.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { InterestsInProject, reset } from '../../../store/slices/InterestedSlice';
import { useAuth } from '../../../contexts';

interface RegisterInterestProps {
  projectName: string;
  projectNameAr: string;
  onSubmit?: (data: InterestFormData) => void;
  projectId: string
}

interface InterestFormData {
  fullName: string;
  email: string;
  phone: string;
  // interestedIn: string;
  // visitDate: string;
  // numberOfPeople: number;
  preferredContact: string;
  message: string;
}

const RegisterInterest: React.FC<RegisterInterestProps> = ({
  projectName,
  projectNameAr,
  projectId,
  onSubmit,
}) => {

  //#region  Code 

  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<InterestFormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<InterestFormData>>({});

  const content = {
    en: {
      title: 'Register Your Interest',
      subtitle: 'Get in touch with us to learn more about this project',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      interestedIn: 'I am interested in',
      buying: 'Buying',
      renting: 'Renting',
      investing: 'Investing',
      information: 'General Information',
      preferredContact: 'Preferred Contact Method',
      emailContact: 'Email',
      phoneContact: 'Phone',
      whatsapp: 'WhatsApp',
      visitDate: 'Preferred Visit Date',
      numberOfPeople: 'Number of People',
      message: 'Additional Message',
      messagePlaceholder: 'Tell us more about your requirements...',
      submit: 'Register Interest',
      submitting: 'Submitting...',
      successTitle: 'Thank You!',
      successMessage: 'Your interest has been registered successfully. Our team will contact you soon.',
      backToProject: 'Back to Project',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      benefits: {
        title: 'Why Register?',
        items: [
          'Priority access to new units',
          'Exclusive pricing offers',
          'Personalized consultation',
          'Project updates and news'
        ]
      }
    },
    ar: {
      title: 'سجل اهتمامك',
      subtitle: 'تواصل معنا لمعرفة المزيد عن هذا المشروع',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      interestedIn: 'أنا مهتم بـ',
      buying: 'الشراء',
      renting: 'الإيجار',
      investing: 'الاستثمار',
      information: 'معلومات عامة',
      preferredContact: 'طريقة التواصل المفضلة',
      emailContact: 'البريد الإلكتروني',
      phoneContact: 'الهاتف',
      whatsapp: 'واتساب',
      visitDate: 'تاريخ الزيارة المفضل',
      numberOfPeople: 'عدد الأشخاص',
      message: 'رسالة إضافية',
      messagePlaceholder: 'أخبرنا المزيد عن متطلباتك...',
      submit: 'سجل الاهتمام',
      submitting: 'جاري الإرسال...',
      successTitle: 'شكراً لك!',
      successMessage: 'تم تسجيل اهتمامك بنجاح. سيتواصل معك فريقنا قريباً.',
      backToProject: 'العودة للمشروع',
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح',
      benefits: {
        title: 'لماذا التسجيل؟',
        items: [
          'أولوية الوصول للوحدات الجديدة',
          'عروض أسعار حصرية',
          'استشارة شخصية',
          'تحديثات وأخبار المشروع'
        ]
      }
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentProjectName = isArabic ? projectNameAr : projectName;


  const methodsContact = [
    {
      "id": 1,
      "name": "Email",
      "nameAr": "البريد الالكتروني"
    },
    {
      "id": 2,
      "name": "PhoneCall",
      "nameAr": "مكالمه هاتفيه"
    },
    {
      "id": 3,
      "name": "Whatsap",
      "nameAr": "واتساب"
    }
  ]
  //#endregion  Code

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    if (user) {
      setFormData({
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        preferredContact: 'email',
        message: ''
      })
    }

  }, [isAuthenticated])

  const {
    data, loading, error
  } = useSelector((state: RootState) => state.projectInterested);
  const dispatch = useDispatch<AppDispatch>();


  const validateForm = (): boolean => {
    const newErrors: Partial<InterestFormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    // if (!formData.phone.trim()) {
    //   newErrors.phone = t.required;
    // } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
    //   newErrors.phone = t.invalidPhone;
    // }

    // if (!formData.interestedIn) {
    //   newErrors.interestedIn = t.required;
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    // setIsSubmitting(true);
    let payload: any = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      preferredContact: formData.preferredContact,
      // interestedIn: formData.interestedIn,
      // visitDate: formData.visitDate,
      // numberOfPeople: formData.numberOfPeople,
      message: formData.message,
      projectId: Number(projectId),
    };

    if (isAuthenticated && user?.id) {
      payload.userId = user.id;
    }
    dispatch(InterestsInProject(payload))
  };

  const handleInputChange = (field: keyof InterestFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredContact: 'email',
      // interestedIn: '',
      // visitDate: '',
      // numberOfPeople: 1,
      message: ''
    });
    setErrors({});
  };


  useEffect(() => {
    dispatch(reset());
  }, [])


  useEffect(() => {
    console.log("this is data ", data);
    if (data === true) {
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  }, [data])


  if (isSubmitted) {
    return (
      <section className={styles.interest} dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={styles.interest__container}>
          <div className={styles.interest__success}>
            <div className={styles.interest__success_icon}>
              <CheckCircle size={64} />
            </div>
            <h2 className={styles.interest__success_title}>{t.successTitle}</h2>
            <p className={styles.interest__success_message}>{t.successMessage}</p>
            <button
              className={styles.interest__back_btn}
              onClick={resetForm}
            >
              {t.backToProject}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.interest} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.interest__container}>
        <div className={styles.interest__content}>
          {/* Form Section */}
          <div className={styles.interest__form_section}>
            <div className={styles.interest__header}>
              <h2 className={styles.interest__title}>{t.title}</h2>
              <p className={styles.interest__subtitle}>{t.subtitle}</p>
              <p className={styles.interest__project_name}>{currentProjectName}</p>
            </div>

            <form className={styles.interest__form} onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className={styles.interest__form_group}>
                <label className={styles.interest__label}>
                  <User size={20} />
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`${styles.interest__input} ${errors.fullName ? styles.interest__input_error : ''}`}
                  placeholder={t.fullName}
                />
                {errors.fullName && (
                  <span className={styles.interest__error}>{errors.fullName}</span>
                )}
              </div>

              <div className={styles.interest__form_row}>
                <div className={styles.interest__form_group}>
                  <label className={styles.interest__label}>
                    <Mail size={20} />
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`${styles.interest__input} ${errors.email ? styles.interest__input_error : ''}`}
                    placeholder={t.email}
                  />
                  {errors.email && (
                    <span className={styles.interest__error}>{errors.email}</span>
                  )}
                </div>

                <div className={styles.interest__form_group}>
                  <label className={styles.interest__label}>
                    <Phone size={20} />
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`${styles.interest__input} ${errors.phone ? styles.interest__input_error : ''}`}
                    placeholder={t.phone}
                  />
                  {errors.phone && (
                    <span className={styles.interest__error}>{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Interest Type */}
              {/* <div className={styles.interest__form_group}>
                <label className={styles.interest__label}>{t.interestedIn}</label>
                <div className={styles.interest__radio_group}>
                  {[
                    { value: 'buying', label: t.buying },
                    { value: 'renting', label: t.renting },
                    { value: 'investing', label: t.investing },
                    { value: 'information', label: t.information }
                  ].map(option => (
                    <label key={option.value} className={styles.interest__radio_option}>
                      <input
                        type="radio"
                        name="interestedIn"
                        value={option.value}
                        checked={formData.interestedIn === option.value}
                        onChange={(e) => handleInputChange('interestedIn', e.target.value)}
                        className={styles.interest__radio}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.interestedIn && (
                  <span className={styles.interest__error}>{errors.interestedIn}</span>
                )}
              </div> */}

              {/* Contact Preferences */}
              <div className={styles.interest__form_group}>
                <label className={styles.interest__label}>{t.preferredContact}</label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                  className={styles.interest__select}
                >
                  {methodsContact.map(item =>
                    <option value={item.id}>{isArabic ? item.nameAr : item.name}</option>
                  )}
                  {/* <option value="phone">{t.phoneContact}</option>
                  <option value="whatsapp">{t.whatsapp}</option>
                   */}
                </select>
              </div>

              {/* Visit Details */}
              {/* <div className={styles.interest__form_row}>
                <div className={styles.interest__form_group}>
                  <label className={styles.interest__label}>
                    <Calendar size={20} />
                    {t.visitDate}
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => handleInputChange('visitDate', e.target.value)}
                    className={styles.interest__input}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className={styles.interest__form_group}>
                  <label className={styles.interest__label}>
                    <Users size={20} />
                    {t.numberOfPeople}
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfPeople}
                    onChange={(e) => handleInputChange('numberOfPeople', parseInt(e.target.value) || 1)}
                    className={styles.interest__input}
                    min="1"
                    max="10"
                  />
                </div>
              </div> */}

              {/* Message */}
              <div className={styles.interest__form_group}>
                <label className={styles.interest__label}>
                  <MessageSquare size={20} />
                  {t.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={styles.interest__textarea}
                  placeholder={t.messagePlaceholder}
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`${styles.interest__submit} ${loading ? styles.interest__submit_loading : ''}`}
              >
                {loading ? (
                  <>
                    <div className={styles.interest__spinner}></div>
                    {t.submitting}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t.submit}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Benefits Section */}
          <div className={styles.interest__benefits_section}>
            <div className={styles.interest__benefits}>
              <h3 className={styles.interest__benefits_title}>{t.benefits.title}</h3>
              <ul className={styles.interest__benefits_list}>
                {t.benefits.items.map((benefit, index) => (
                  <li key={index} className={styles.interest__benefits_item}>
                    <CheckCircle size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterInterest;