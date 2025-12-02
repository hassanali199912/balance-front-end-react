import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import PageBreadcrumb from '../../components/ui/shared/PageBreadcrumb';
import Toast from '../../components/ui/common/Toast';
import styles from '../../styles/components/public/Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { contactFormApi, ContactFromData } from '../../store/slices/ContactFormSlice';
import { CompanyInfo } from '../../store/slices/CMSSlice';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  inquiryType: 'general' | 'property' | 'investment' | 'support';
}

interface CompanyInfoProps {
  companyInfo: CompanyInfo
}
const ContactPage: React.FC<CompanyInfoProps> = ({ companyInfo }) => {

  //#region Code
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const [formData, setFormData] = useState<ContactFromData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
    inquiryType: 1
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({ show: false, message: '', type: 'success' });

  const content = {
    en: {
      pageTitle: 'Contact Us',
      pageSubtitle: 'Get in touch with our team for any inquiries about properties, investments, or services',
      contactInfo: 'Contact Information',
      getInTouch: 'Get In Touch',
      sendMessage: 'Send Message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject',
      message: 'Message',
      inquiryType: 'Inquiry Type',
      inquiryTypes: {
        general: 'General Inquiry',
        property: 'Property Information',
        investment: 'Investment Opportunities',
        support: 'Customer Support'
      },
      officeHours: 'Office Hours',
      location: 'Our Location',
      placeholders: {
        name: 'Enter your full name',
        email: 'Enter your email address',
        phone: 'Enter your phone number',
        subject: 'Enter the subject of your inquiry',
        message: 'Write your message here...'
      },
      contactDetails: {
        address: companyInfo?.addressEn ? companyInfo?.addressEn : 'King Fahd Road, Al Olaya District, Riyadh 12211, Saudi Arabia',
        addressAr: companyInfo?.addressAr ? companyInfo?.addressAr : 'طريق الملك فهد، حي العليا، الرياض 12211، المملكة العربية السعودية',
        phone: companyInfo?.phone ? companyInfo?.phone : '+966 11 123 4567',
        email: companyInfo?.email ? companyInfo?.email : 'info@balancerealestate.com',
        hours: companyInfo?.workingHoursEn ? companyInfo?.workingHoursEn : 'Sunday - Thursday: 9:00 AM - 6:00 PM',
        hoursAr: companyInfo?.workingHoursAr ? companyInfo?.workingHoursAr : 'الأحد - الخميس: 9:00 ص - 6:00 م'
      },
      validation: {
        nameRequired: 'Full name is required',
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Please enter a valid phone number',
        subjectRequired: 'Subject is required',
        messageRequired: 'Message is required',
        messageSent: 'Message sent successfully! We will get back to you soon.',
        sendError: 'Failed to send message. Please try again.'
      },
      formSubmit: {
        success: "Thank you for your message! We will get in touch soon.",
        error: "Something went wrong,try again latter"
      }
    },
    ar: {
      pageTitle: 'اتصل بنا',
      pageSubtitle: 'تواصل مع فريقنا لأي استفسارات حول العقارات أو الاستثمارات أو الخدمات',
      contactInfo: 'معلومات الاتصال',
      getInTouch: 'تواصل معنا',
      sendMessage: 'إرسال رسالة',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      subject: 'الموضوع',
      message: 'الرسالة',
      inquiryType: 'نوع الاستفسار',
      inquiryTypes: {
        general: 'استفسار عام',
        property: 'معلومات عقارية',
        investment: 'فرص استثمارية',
        support: 'دعم العملاء'
      },
      officeHours: 'ساعات العمل',
      location: 'موقعنا',
      placeholders: {
        name: 'أدخل اسمك الكامل',
        email: 'أدخل بريدك الإلكتروني',
        phone: 'أدخل رقم هاتفك',
        subject: 'أدخل موضوع استفسارك',
        message: 'اكتب رسالتك هنا...'
      },
      contactDetails: {
        address: companyInfo?.addressEn ? companyInfo?.addressEn : 'طريق الملك فهد، حي العليا، الرياض 12211، المملكة العربية السعودية',
        addressAr: companyInfo?.addressAr ? companyInfo?.addressAr : 'طريق الملك فهد، حي العليا، الرياض 12211، المملكة العربية السعودية',
        phone: companyInfo?.phone ? companyInfo?.phone : '+966 11 123 4567',
        email: companyInfo?.email ? companyInfo?.email : 'info@balancerealestate.com',
        hours: companyInfo?.workingHoursEn ? companyInfo?.workingHoursEn : 'الأحد - الخميس: 9:00 ص - 6:00 م',
        hoursAr: companyInfo?.workingHoursAr ? companyInfo?.workingHoursAr : 'الأحد - الخميس: 9:00 ص - 6:00 م'
      },
      validation: {
        nameRequired: 'الاسم الكامل مطلوب',
        emailRequired: 'البريد الإلكتروني مطلوب',
        emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
        subjectRequired: 'الموضوع مطلوب',
        messageRequired: 'الرسالة مطلوبة',
        messageSent: 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
        sendError: 'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
      },
      formSubmit: {
        success: "تم ايصال الرسالة , سوف يقوم فريقنا بالتواصل معك قريبا ",
        error: "حدث خطاء اثناء الارسال , يرجا المحاولة لاحقا "
      }
    }
  };
  const t = isArabic ? content.ar : content.en;
  const { data, error, loading } = useSelector((state: RootState) => state.Contact)
  const dispatch = useDispatch<AppDispatch>()


  const lat = companyInfo?.latitude ? companyInfo?.latitude : companyInfo?.latitude;
  const lon = companyInfo?.longitude ? companyInfo?.latitude : companyInfo?.latitude;
  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;


  //#endregion Code

  //#region Functionality

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ show: true, message, type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {

    if (!formData.fullName.trim()) {

      showToast(t.validation.nameRequired, 'error');
      return false;
    }

    if (!formData.email.trim()) {
      showToast(t.validation.emailRequired, 'error');

      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast(t.validation.emailInvalid, 'error');


      return false;
    }

    if (!formData.phoneNumber.trim()) {
      showToast(t.validation.phoneRequired, 'error');



      return false;
    }

    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ''))) {
      showToast(t.validation.phoneInvalid, 'error');

      return false;
    }

    if (!formData.subject.trim()) {
      showToast(t.validation.subjectRequired, 'error');


      return false;
    }

    if (!formData.message.trim()) {
      showToast(t.validation.messageRequired, 'error');

      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {

      return
    };
    const payloadData: ContactFromData = {
      email: formData.email,
      fullName: formData.fullName,
      inquiryType: Number(formData.inquiryType),
      message: formData.message,
      phoneNumber: formData.phoneNumber,
      subject: formData.subject

    }
    dispatch(contactFormApi(payloadData))
  };

  useEffect(() => {
    // in case success
    if (!loading && data !== null && data.message === "Thank you for your message! We will get in touch soon.") {
      showToast(t.formSubmit.success, "success")
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: '',
        inquiryType: 1
      })
    }

    !loading && error !== null && showToast(t.formSubmit.error, "error")
  }, [data, error])

  //#endregion Functionality




  return (
    <div className={styles.contact} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Page Breadcrumb */}
      <PageBreadcrumb
        title={t.pageTitle}
        titleAr={t.pageTitle}
        backgroundImage="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753362166/Image-6_u4opka.jpg"
      />

      <div className={styles.contact__container}>
        <div className={styles.contact__content}>
          <div className={styles.contact__grid}>
            {/* Contact Information */}
            <div className={styles.contact__info_section}>
              <h2 className={styles.contact__section_title}>{t.contactInfo}</h2>

              {/* Contact Cards */}
              <div className={styles.contact__info_cards}>
                <div className={styles.contact__info_card}>
                  <div className={styles.contact__info_icon}>
                    <MapPin size={24} />
                  </div>
                  <div className={styles.contact__info_content}>
                    <h3 className={styles.contact__info_title}>{t.location}</h3>
                    <p className={styles.contact__info_text}>
                      {isArabic ? t.contactDetails.addressAr : t.contactDetails.address}
                    </p>
                  </div>
                </div>

                <div className={styles.contact__info_card}>
                  <div className={styles.contact__info_icon}>
                    <Phone size={24} />
                  </div>
                  <div className={styles.contact__info_content}>
                    <h3 className={styles.contact__info_title}>{t.phone}</h3>
                    <p className={styles.contact__info_text}>{t.contactDetails.phone}</p>
                  </div>
                </div>

                <div className={styles.contact__info_card}>
                  <div className={styles.contact__info_icon}>
                    <Mail size={24} />
                  </div>
                  <div className={styles.contact__info_content}>
                    <h3 className={styles.contact__info_title}>{t.email}</h3>
                    <p className={styles.contact__info_text}>{t.contactDetails.email}</p>
                  </div>
                </div>

                <div className={styles.contact__info_card}>
                  <div className={styles.contact__info_icon}>
                    <Clock size={24} />
                  </div>
                  <div className={styles.contact__info_content}>
                    <h3 className={styles.contact__info_title}>{t.officeHours}</h3>
                    <p className={styles.contact__info_text}>
                      {isArabic ? t.contactDetails.hoursAr : t.contactDetails.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contact__form_section}>
              <h2 className={styles.contact__section_title}>{t.getInTouch}</h2>

              <form className={styles.contact__form} onSubmit={handleSubmit}>
                {/* Name and Email Row */}
                <div className={styles.contact__form_row}>
                  <div className={styles.contact__form_group}>
                    <label className={styles.contact__label}>{t.name}</label>
                    <div className={styles.contact__input_wrapper}>
                      <User className={styles.contact__input_icon} size={20} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={t.placeholders.name}
                        className={styles.contact__input}
                        disabled={loading}

                      />
                    </div>
                  </div>

                  <div className={styles.contact__form_group}>
                    <label className={styles.contact__label}>{t.email}</label>
                    <div className={styles.contact__input_wrapper}>
                      <Mail className={styles.contact__input_icon} size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.placeholders.email}
                        className={styles.contact__input}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Phone and Inquiry Type Row */}
                <div className={styles.contact__form_row}>
                  <div className={styles.contact__form_group}>
                    <label className={styles.contact__label}>{t.phone}</label>
                    <div className={styles.contact__input_wrapper}>
                      <Phone className={styles.contact__input_icon} size={20} />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder={t.placeholders.phone}
                        className={styles.contact__input}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className={styles.contact__form_group}>
                    <label className={styles.contact__label}>{t.inquiryType}</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className={styles.contact__select}
                      disabled={loading}
                    >
                      <option value={1}>{t.inquiryTypes.general}</option>
                      <option value={2}>{t.inquiryTypes.property}</option>
                      <option value={3}>{t.inquiryTypes.investment}</option>
                      <option value={4}>{t.inquiryTypes.support}</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className={styles.contact__form_group}>
                  <label className={styles.contact__label}>{t.subject}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t.placeholders.subject}
                    className={styles.contact__input}
                    disabled={loading}
                  />
                </div>

                {/* Message */}
                <div className={styles.contact__form_group}>
                  <label className={styles.contact__label}>{t.message}</label>
                  <div className={styles.contact__textarea_wrapper}>
                    <MessageSquare className={styles.contact__textarea_icon} size={20} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.placeholders.message}
                      className={styles.contact__textarea}
                      rows={5}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles.contact__submit_btn}
                  disabled={loading}
                >
                  {loading ? (
                    <div className={styles.contact__loading}>
                      <div className={styles.contact__spinner}></div>
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
        </div>

        {/* Map Section */}
        <div className={styles.contact__map_section}>
          <div className={styles.contact__map}>
            <iframe
              src={mapUrl ? mapUrl : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0c8c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2sKing%20Fahd%20Rd%2C%20Al%20Olaya%2C%20Riyadh%2012211%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890"}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t.location}
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default ContactPage;
