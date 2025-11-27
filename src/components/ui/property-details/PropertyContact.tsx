import React, { useEffect, useState } from 'react';
import { Phone, Mail, MessageCircle, User, Send } from 'lucide-react';
import styles from '../../../styles/components/property-details/PropertyContact.module.css';
import { useLanguage } from '../../../contexts/useLanguage';
import Toast from '../Toast';
import { ContactFormData, InterestsInUnit, reset } from '../../../store/slices/InterestedSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { useAuth } from '../../../contexts';

interface PropertyContactProps {
  propertyId: number;
  propertyTitle: string;
  propertyTitleAr: string;
  agentName?: string;
  agentNameAr?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentPhoto?: string;
}



const PropertyContact: React.FC<PropertyContactProps> = ({
  propertyTitle,
  propertyTitleAr,
  agentName,
  agentNameAr,
  agentPhone,
  agentEmail,
  agentPhoto,
  propertyId
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    contactPreference: 0,
    unitId: propertyId
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');

  const content = {
    en: {
      title: 'Contact Agent',
      agentInfo: 'Agent Information',
      contactForm: 'Send Message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Message',
      contactPreference: 'Preferred Contact Method',
      contactOptions: {
        phone: 'Phone Call',
        email: 'Email',
        whatsapp: 'WhatsApp'
      },
      placeholders: {
        name: 'Enter your full name',
        email: 'Enter your email address',
        phone: 'Enter your phone number',
        message: 'I am interested in this property...'
      },
      sendMessage: 'Send Message',
      callAgent: 'Call Agent',
      emailAgent: 'Email Agent',
      whatsappAgent: 'WhatsApp',
      messageSent: 'Message sent successfully!',
      messageError: 'Failed to send message. Please try again.',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number'
    },
    ar: {
      title: 'التواصل مع الوكيل',
      agentInfo: 'معلومات الوكيل',
      contactForm: 'إرسال رسالة',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'الرسالة',
      contactPreference: 'طريقة التواصل المفضلة',
      contactOptions: {
        phone: 'مكالمة هاتفية',
        email: 'البريد الإلكتروني',
        whatsapp: 'واتساب'
      },
      placeholders: {
        name: 'أدخل اسمك الكامل',
        email: 'أدخل بريدك الإلكتروني',
        phone: 'أدخل رقم هاتفك',
        message: 'أنا مهتم بهذا العقار...'
      },
      sendMessage: 'إرسال الرسالة',
      callAgent: 'اتصال بالوكيل',
      emailAgent: 'مراسلة الوكيل',
      whatsappAgent: 'واتساب',
      messageSent: 'تم إرسال الرسالة بنجاح!',
      messageError: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح'
    }
  };

  const t = isArabic ? content.ar : content.en;
  const currentPropertyTitle = isArabic ? propertyTitleAr : propertyTitle;
  const currentAgentName = isArabic ? agentNameAr : agentName;


  const {
    data, loading, error
  } = useSelector((state: RootState) => state.projectInterested);
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useAuth();


  useEffect(() => {
    dispatch(reset());
  }, [])




  // Form validation
  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;

    if (!formData.name.trim()) {
      setToastMessage(t.required);
      setToastType('error');
      setShowToast(true);
      return false;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setToastMessage(t.invalidEmail);
      setToastType('error');
      setShowToast(true);
      return false;
    }

    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      setToastMessage(t.invalidPhone);
      setToastType('error');
      setShowToast(true);
      return false;
    }

    if (!formData.message.trim()) {
      setToastMessage(t.required);
      setToastType('error');
      setShowToast(true);
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    let payload: any = {

      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      contactPreference: formData.contactPreference,
      unitId: propertyId
    };

    if (isAuthenticated && user?.id) {
      payload.userId = user.id;
    }
    dispatch(InterestsInUnit(payload))
  };



  useEffect(() => {
    console.log("this is data ", data);
    if (data === true) {
      setToastMessage(t.messageSent);
      setToastType('success');
      setShowToast(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        contactPreference: 0,
        unitId: propertyId
      });
    } else {
      setToastMessage(t.messageError);
      setToastType('error');
      setShowToast(true);
    }
  }, [data])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate contact URLs
  const whatsappUrl = agentPhone ? `https://wa.me/${agentPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`مرحباً، أنا مهتم بالعقار: ${currentPropertyTitle}`)}` : '#';
  const emailUrl = agentEmail ? `mailto:${agentEmail}?subject=${encodeURIComponent(`استفسار عن العقار: ${currentPropertyTitle}`)}` : '#';
  const phoneUrl = agentPhone ? `tel:${agentPhone}` : '#';

  return (
    <div className={styles.contact} dir={isArabic ? 'rtl' : 'ltr'}
    >
      <h2 className={styles.contact__title}>{t.title}</h2>

      <div className={styles.contact__content}>
        {/* Agent Information */}
        {(currentAgentName || agentPhone || agentEmail) && (
          <div className={styles.contact__agent}>            <h3 className={styles.contact__agent_title}>{t.agentInfo}</h3>

            <div className={styles.contact__agent_card}>
              {agentPhoto && (
                <div className={styles.contact__agent_photo}>
                  <img src={agentPhoto} alt={currentAgentName} />
                </div>
              )}

              <div className={styles.contact__agent_info}>
                {currentAgentName && (
                  <h4 className={styles.contact__agent_name}>{currentAgentName}</h4>
                )}

                <div className={styles.contact__agent_actions}>
                  {agentPhone && (
                    <a href={phoneUrl} className={styles.contact__agent_action}>
                      <Phone size={16} />
                      {t.callAgent}
                    </a>
                  )}
                  {agentEmail && (
                    <a href={emailUrl} className={styles.contact__agent_action}>
                      <Mail size={16} />
                      {t.emailAgent}
                    </a>
                  )}
                  {agentPhone && (
                    <a href={whatsappUrl} className={`${styles.contact__agent_action} ${styles.contact__agent_action_whatsapp}`}>
                      <MessageCircle size={16} />
                      {t.whatsappAgent}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className={styles.contact__form_section}>
          <h3 className={styles.contact__form_title}>{t.contactForm}</h3>

          <form className={styles.contact__form} onSubmit={handleSubmit}>
            <div className={styles.contact__form_row}>
              <div className={styles.contact__form_group}>
                <label className={styles.contact__form_label}>
                  <User size={16} />
                  {t.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.name}
                  className={styles.contact__form_input}
                  required
                />
              </div>

              <div className={styles.contact__form_group}>
                <label className={styles.contact__form_label}>
                  <Mail size={16} />
                  {t.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.email}
                  className={styles.contact__form_input}
                  required
                />
              </div>
            </div>

            <div className={styles.contact__form_row}>
              <div className={styles.contact__form_group}>
                <label className={styles.contact__form_label}>
                  <Phone size={16} />
                  {t.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.placeholders.phone}
                  className={styles.contact__form_input}
                  required
                />
              </div>

              <div className={styles.contact__form_group}>
                <label className={styles.contact__form_label}>
                  <MessageCircle size={16} />
                  {t.contactPreference}
                </label>
                <select
                  name="contactPreference"
                  value={formData.contactPreference}
                  onChange={handleInputChange}
                  className={styles.contact__form_select}
                >
                  <option value={0}>{t.contactOptions.phone}</option>
                  <option value={1}>{t.contactOptions.email}</option>
                  <option value={2}>{t.contactOptions.whatsapp}</option>
                </select>
              </div>
            </div>

            <div className={styles.contact__form_group}>
              <label className={styles.contact__form_label}>
                <MessageCircle size={16} />
                {t.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.placeholders.message}
                className={styles.contact__form_textarea}
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.contact__form_submit}
              disabled={loading}
            >
              {loading ? (
                <div className={styles.contact__form_loading}>
                  <div className={styles.contact__form_spinner}></div>
                  {isArabic ? 'جاري الإرسال...' : 'Sending...'}
                </div>
              ) : (
                <>
                  <Send size={16} />
                  {t.sendMessage}
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default PropertyContact;
