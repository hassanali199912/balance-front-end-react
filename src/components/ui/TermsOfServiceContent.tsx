import React from 'react';
import styles from './LegalContent.module.css';

interface TermsOfServiceContentProps {
  isArabic: boolean;
}

const TermsOfServiceContent: React.FC<TermsOfServiceContentProps> = ({ isArabic }) => {
  if (isArabic) {
    return (
      <div className={styles.legal__content}>
        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>1. المقدمة والقبول</h3>
          <p className={styles.legal__text}>
            مرحباً بكم في شركة بالنس للتطوير العقاري. هذه الشروط والأحكام تحكم استخدامكم لموقعنا الإلكتروني وخدماتنا. 
            باستخدام موقعنا، فإنكم توافقون على هذه الشروط بالكامل. إذا كنتم لا توافقون على أي جزء من هذه الشروط، 
            فيجب عليكم عدم استخدام خدماتنا.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>2. تعريف الخدمات</h3>
          <p className={styles.legal__text}>
            تقدم شركة بالنس خدمات التطوير العقاري والاستشارات العقارية في المملكة العربية السعودية. تشمل خدماتنا:
          </p>
          <ul className={styles.legal__list}>
            <li>تطوير المشاريع السكنية والتجارية</li>
            <li>بيع وشراء العقارات</li>
            <li>الاستشارات العقارية المتخصصة</li>
            <li>إدارة الأملاك والعقارات</li>
            <li>خدمات التسويق العقاري</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>3. التزامات المستخدم</h3>
          <p className={styles.legal__text}>
            عند استخدام خدماتنا، تتعهدون بـ:
          </p>
          <ul className={styles.legal__list}>
            <li>تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
            <li>عدم استخدام الموقع لأي أغراض غير قانونية</li>
            <li>احترام حقوق الملكية الفكرية للشركة</li>
            <li>عدم التلاعب أو محاولة اختراق النظام</li>
            <li>الالتزام بجميع القوانين واللوائح المعمول بها في المملكة</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>4. الخصوصية وحماية البيانات</h3>
          <p className={styles.legal__text}>
            نحن ملتزمون بحماية خصوصيتكم. نقوم بجمع ومعالجة بياناتكم الشخصية وفقاً لسياسة الخصوصية الخاصة بنا 
            وبما يتماشى مع نظام حماية البيانات الشخصية في المملكة العربية السعودية.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>5. المسؤولية والضمانات</h3>
          <p className={styles.legal__text}>
            بينما نسعى لتقديم أفضل الخدمات، فإن الشركة:
          </p>
          <ul className={styles.legal__list}>
            <li>لا تضمن دقة جميع المعلومات المنشورة على الموقع</li>
            <li>غير مسؤولة عن أي أضرار مباشرة أو غير مباشرة</li>
            <li>تحتفظ بالحق في تعديل أو إيقاف الخدمات في أي وقت</li>
            <li>تسعى لضمان أمان الموقع ولكن لا تضمن عدم تعرضه لأي مشاكل تقنية</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>6. الدفع والرسوم</h3>
          <p className={styles.legal__text}>
            جميع الأسعار المعروضة بالريال السعودي وتشمل ضريبة القيمة المضافة حيثما ينطبق ذلك. 
            الشركة تحتفظ بالحق في تغيير الأسعار في أي وقت. عمليات الدفع تتم من خلال وسائل آمنة ومعتمدة.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>7. الملكية الفكرية</h3>
          <p className={styles.legal__text}>
            جميع المحتويات على هذا الموقع بما في ذلك النصوص والصور والتصاميم والشعارات هي ملكية حصرية 
            لشركة بالنس للتطوير العقاري ومحمية بموجب قوانين حقوق الطبع والنشر في المملكة العربية السعودية.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>8. إنهاء الخدمة</h3>
          <p className={styles.legal__text}>
            يحق للشركة إنهاء أو تعليق حسابكم في حالة مخالفة هذه الشروط. كما يحق لكم إنهاء حسابكم في أي وقت 
            بإرسال طلب خطي إلى خدمة العملاء.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>9. القانون المطبق</h3>
          <p className={styles.legal__text}>
            تخضع هذه الشروط والأحكام لقوانين المملكة العربية السعودية. أي نزاع ينشأ عن هذه الشروط 
            سيتم حله وفقاً للأنظمة المعمول بها في المملكة.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>10. تعديل الشروط</h3>
          <p className={styles.legal__text}>
            تحتفظ الشركة بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعاركم بأي تغييرات جوهرية عبر البريد الإلكتروني 
            أو من خلال إشعار على الموقع. استمرار استخدامكم للخدمات بعد التعديل يعني موافقتكم على الشروط الجديدة.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>11. معلومات الاتصال</h3>
          <p className={styles.legal__text}>
            لأي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا:
          </p>
          <div className={styles.legal__contact}>
            <p><strong>شركة بالنس للتطوير العقاري</strong></p>
            <p>البريد الإلكتروني: legal@balance-realestate.com</p>
            <p>الهاتف: +966 11 123 4567</p>
            <p>العنوان: الرياض، المملكة العربية السعودية</p>
          </div>
        </div>

        <div className={styles.legal__footer}>
          <p className={styles.legal__footer_text}>
            آخر تحديث: يناير 2024
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.legal__content}>
      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>1. Introduction and Acceptance</h3>
        <p className={styles.legal__text}>
          Welcome to Balance Real Estate Development Company. These Terms of Service govern your use of our website and services. 
          By using our website, you agree to these terms in full. If you disagree with any part of these terms, 
          then you must not use our services.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>2. Service Definition</h3>
        <p className={styles.legal__text}>
          Balance Company provides real estate development services and real estate consulting in Saudi Arabia. Our services include:
        </p>
        <ul className={styles.legal__list}>
          <li>Development of residential and commercial projects</li>
          <li>Real estate buying and selling</li>
          <li>Specialized real estate consulting</li>
          <li>Property and real estate management</li>
          <li>Real estate marketing services</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>3. User Obligations</h3>
        <p className={styles.legal__text}>
          When using our services, you agree to:
        </p>
        <ul className={styles.legal__list}>
          <li>Provide accurate and truthful information when registering</li>
          <li>Not use the website for any illegal purposes</li>
          <li>Respect the company's intellectual property rights</li>
          <li>Not manipulate or attempt to hack the system</li>
          <li>Comply with all applicable laws and regulations in the Kingdom</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>4. Privacy and Data Protection</h3>
        <p className={styles.legal__text}>
          We are committed to protecting your privacy. We collect and process your personal data in accordance with our Privacy Policy 
          and in compliance with the Personal Data Protection System in Saudi Arabia.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>5. Liability and Warranties</h3>
        <p className={styles.legal__text}>
          While we strive to provide the best services, the company:
        </p>
        <ul className={styles.legal__list}>
          <li>Does not guarantee the accuracy of all information published on the website</li>
          <li>Is not responsible for any direct or indirect damages</li>
          <li>Reserves the right to modify or discontinue services at any time</li>
          <li>Strives to ensure website security but does not guarantee freedom from technical issues</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>6. Payment and Fees</h3>
        <p className={styles.legal__text}>
          All prices are displayed in Saudi Riyals and include VAT where applicable. 
          The company reserves the right to change prices at any time. Payments are made through secure and approved methods.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>7. Intellectual Property</h3>
        <p className={styles.legal__text}>
          All content on this website including texts, images, designs, and logos are the exclusive property 
          of Balance Real Estate Development Company and are protected under copyright laws in Saudi Arabia.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>8. Service Termination</h3>
        <p className={styles.legal__text}>
          The company has the right to terminate or suspend your account in case of violation of these terms. 
          You also have the right to terminate your account at any time by sending a written request to customer service.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>9. Applicable Law</h3>
        <p className={styles.legal__text}>
          These Terms of Service are governed by the laws of Saudi Arabia. Any dispute arising from these terms 
          will be resolved in accordance with the applicable regulations in the Kingdom.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>10. Terms Modification</h3>
        <p className={styles.legal__text}>
          The company reserves the right to modify these terms at any time. You will be notified of any material changes 
          via email or through a notice on the website. Continued use of services after modification means acceptance of the new terms.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>11. Contact Information</h3>
        <p className={styles.legal__text}>
          For any inquiries about these Terms of Service, please contact us:
        </p>
        <div className={styles.legal__contact}>
          <p><strong>Balance Real Estate Development Company</strong></p>
          <p>Email: legal@balance-realestate.com</p>
          <p>Phone: +966 11 123 4567</p>
          <p>Address: Riyadh, Saudi Arabia</p>
        </div>
      </div>

      <div className={styles.legal__footer}>
        <p className={styles.legal__footer_text}>
          Last updated: January 2024
        </p>
      </div>
    </div>
  );
};

export default TermsOfServiceContent;
