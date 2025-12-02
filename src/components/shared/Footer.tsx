import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react'
import { X } from 'lucide-react'
import styles from '../../styles/components/Footer.module.css'
import { useLanguage } from '../../contexts/useLanguage'
import { CompanyInfo } from '../../store/slices/CMSSlice'

interface CompanyInfoProps {
  companyInfo: CompanyInfo
}
const Footer: React.FC<CompanyInfoProps> = ({ companyInfo }) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      companyName: companyInfo?.aboutTitleEn ? companyInfo?.aboutTitleEn : 'Balance Real Estate',
      about: companyInfo?.aboutDescriptionEn ? companyInfo?.aboutDescriptionEn : 'Your trusted partner in real estate development. We create exceptional properties that balance luxury, comfort, and investment value.',
      quickLinks: 'Quick Links',
      services: 'Services',
      contactInfo: 'Contact Info',
      links: {
        home: 'Home',
        projects: 'Projects',
        about: 'About Us',
        contact: 'Contact'
      },
      servicesList: {
        residential: 'Residential Development',
        commercial: 'Commercial Projects',
        investment: 'Investment Consulting',
        management: 'Property Management'
      },
      contactData: {
        address: companyInfo?.addressEn ? companyInfo?.addressEn : 'King Fahd Road, Riyadh, Saudi Arabia, 12345',
        phone: companyInfo?.phone ? companyInfo?.phone : '+966 50 123 4567',
        email: companyInfo?.email ? companyInfo?.email : 'info@balance-re.com'
      },
      copyright: companyInfo?.copyrightTextEn ? companyInfo?.copyrightTextEn : '© 2025 Balance Real Estate Co. All rights reserved.'
    },
    ar: {
      companyName: companyInfo?.aboutTitleAr ? companyInfo?.aboutTitleAr : 'بالانس العقارية',
      about: companyInfo?.aboutDescriptionAr ? companyInfo?.aboutDescriptionAr : 'شريكك الموثوق في التطوير العقاري. نقوم بإنشاء عقارات استثنائية تجمع بين الفخامة والراحة والقيمة الاستثمارية.',
      quickLinks: 'روابط سريعة',
      services: 'خدماتنا',
      contactInfo: 'معلومات التواصل',
      links: {
        home: 'الرئيسية',
        projects: 'المشاريع',
        about: 'من نحن',
        contact: 'اتصل بنا'
      },
      servicesList: {
        residential: 'التطوير السكني',
        commercial: 'المشاريع التجارية',
        investment: 'الاستشارات الاستثمارية',
        management: 'إدارة العقارات'
      },
      contactData: {
        address: companyInfo?.addressAr ? companyInfo?.addressAr : 'طريق الملك فهد، الرياض، المملكة العربية السعودية، 12345',
        phone: companyInfo?.phone ? companyInfo?.phone : '+966 50 123 4567',
        email: companyInfo?.email ? companyInfo?.email : 'info@balance-re.com'
      },
      copyright: companyInfo?.copyrightTextAr ? companyInfo?.copyrightTextAr : '© 2025 شركة بالانس العقارية. جميع الحقوق محفوظة.'
    }
  };

  const t = isArabic ? content.ar : content.en;

  return (
    <footer className={styles.footer} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {/* Company Info */}
          <div>
            <div className={styles.footer__logo}>
              {t.companyName}
            </div>
            <p className={styles.footer__about}>
              {t.about}
            </p>
            <div className={styles.footer__social}>
              {companyInfo && companyInfo?.socialLinks.map((item, index) => {
                if (item.isVisible === true) {
                  if (item.key === "Facebook") {
                    return <>
                      <a key={index} href={item.value} className={styles["footer__social-link"]}>
                        <Facebook size={18} />
                      </a>
                    </>
                  } else if (item.key === "Instagram") {
                    return <>   <a key={index} href={item.value} className={styles["footer__social-link"]}>
                      <Instagram size={18} />
                    </a></>
                  } else if (item.key === "LinkedIn") {
                    return <> <a key={index} href={item.value} className={styles["footer__social-link"]}>
                      <Linkedin size={18} />
                    </a></>
                  } else if (item.key === "X") {
                    return <> <a key={index} href={item.value} className={styles["footer__social-link"]}>
                      <X size={18} />
                    </a></>

                  } else {
                    return;
                  }
                }
              })}

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.footer__heading}>{t.quickLinks}</h4>
            <ul className={styles.footer__links}>
              <li>
                <Link to="/" className={styles.footer__link}>
                  {t.links.home}
                </Link>
              </li>
              <li>
                <Link to="/projects" className={styles.footer__link}>
                  {t.links.projects}
                </Link>
              </li>
              <li>
                <Link to="/about" className={styles.footer__link}>
                  {t.links.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.footer__link}>
                  {t.links.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={styles.footer__heading}>{t.services}</h4>
            <ul className={styles.footer__links}>
              <li>
                <Link to="/services/residential" className={styles.footer__link}>
                  {t.servicesList.residential}
                </Link>
              </li>
              <li>
                <Link to="/services/commercial" className={styles.footer__link}>
                  {t.servicesList.commercial}
                </Link>
              </li>
              <li>
                <Link to="/services/investment" className={styles.footer__link}>
                  {t.servicesList.investment}
                </Link>
              </li>
              <li>
                <Link to="/services/property-management" className={styles.footer__link}>
                  {t.servicesList.management}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={styles.footer__heading}>{t.contactInfo}</h4>
            <div>
              <div className={styles["footer__contact-item"]}>
                <MapPin size={18} className={styles["footer__contact-icon"]} />
                <p>
                  {t.contactData.address}
                </p>
              </div>
              <div className={styles["footer__contact-item"]}>
                <Phone size={18} className={styles["footer__contact-icon"]} />
                <p>{t.contactData.phone}</p>
              </div>
              <div className={styles["footer__contact-item"]}>
                <Mail size={18} className={styles["footer__contact-icon"]} />
                <p>{t.contactData.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footer__bottom}>
          <p>
            {t.copyright}
          </p>
        </div>
      </div>
    </footer >
  )
}

export default Footer
