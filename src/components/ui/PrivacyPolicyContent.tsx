import React from 'react';
import styles from './LegalContent.module.css';

interface PrivacyPolicyContentProps {
  isArabic: boolean;
}

const PrivacyPolicyContent: React.FC<PrivacyPolicyContentProps> = ({ isArabic }) => {
  if (isArabic) {
    return (
      <div className={styles.legal__content}>
        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>1. المقدمة</h3>
          <p className={styles.legal__text}>
            تحترم شركة بالنس للتطوير العقاري خصوصيتكم وتلتزم بحماية بياناتكم الشخصية. 
            هذه السياسة توضح كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتكم الشخصية وفقاً لنظام حماية البيانات الشخصية 
            في المملكة العربية السعودية.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>2. البيانات التي نجمعها</h3>
          <p className={styles.legal__text}>
            نقوم بجمع الأنواع التالية من البيانات:
          </p>
          <ul className={styles.legal__list}>
            <li><strong>البيانات الشخصية:</strong> الاسم، البريد الإلكتروني، رقم الهاتف، العنوان</li>
            <li><strong>البيانات المالية:</strong> معلومات الدفع والفواتير (مُشفرة وآمنة)</li>
            <li><strong>بيانات التصفح:</strong> عنوان IP، نوع المتصفح، أوقات الزيارة</li>
            <li><strong>التفضيلات:</strong> نوع العقارات المفضلة، الميزانية، المنطقة المرغوبة</li>
            <li><strong>بيانات التفاعل:</strong> الصفحات المزارة، الوقت المُقضى، النقرات</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>3. كيفية استخدام البيانات</h3>
          <p className={styles.legal__text}>
            نستخدم بياناتكم للأغراض التالية:
          </p>
          <ul className={styles.legal__list}>
            <li>تقديم وتحسين خدماتنا العقارية</li>
            <li>التواصل معكم بخصوص الاستفسارات والطلبات</li>
            <li>إرسال عروض عقارية مخصصة حسب اهتماماتكم</li>
            <li>معالجة المعاملات المالية بأمان</li>
            <li>تحليل استخدام الموقع لتحسين تجربة المستخدم</li>
            <li>الامتثال للمتطلبات القانونية والتنظيمية</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>4. مشاركة البيانات</h3>
          <p className={styles.legal__text}>
            لا نبيع أو نؤجر أو نتاجر ببياناتكم الشخصية. قد نشارك بياناتكم مع:
          </p>
          <ul className={styles.legal__list}>
            <li><strong>الشركاء المعتمدين:</strong> البنوك وشركات التمويل للمعاملات العقارية</li>
            <li><strong>مقدمي الخدمات:</strong> شركات تقنية المعلومات والدعم التقني</li>
            <li><strong>الجهات القانونية:</strong> عند الطلب من السلطات المختصة</li>
            <li><strong>المطورين:</strong> لتنسيق عمليات البيع والشراء</li>
          </ul>
          <p className={styles.legal__text}>
            جميع الأطراف الثالثة ملزمة بحماية بياناتكم وفقاً لمعايير الأمان العالية.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>5. أمان البيانات</h3>
          <p className={styles.legal__text}>
            نتخذ تدابير أمنية متقدمة لحماية بياناتكم:
          </p>
          <ul className={styles.legal__list}>
            <li>تشفير البيانات الحساسة باستخدام معايير SSL/TLS</li>
            <li>أنظمة حماية متقدمة ضد الاختراق والبرمجيات الخبيثة</li>
            <li>وصول محدود للموظفين المخولين فقط</li>
            <li>نسخ احتياطي منتظم ومُشفر للبيانات</li>
            <li>مراجعة دورية لأنظمة الأمان</li>
            <li>التدريب المستمر للموظفين على أمان المعلومات</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>6. حقوقكم</h3>
          <p className={styles.legal__text}>
            لديكم الحقوق التالية فيما يتعلق ببياناتكم الشخصية:
          </p>
          <ul className={styles.legal__list}>
            <li><strong>حق الوصول:</strong> طلب نسخة من بياناتكم الشخصية</li>
            <li><strong>حق التصحيح:</strong> تحديث أو تصحيح البيانات غير الدقيقة</li>
            <li><strong>حق الحذف:</strong> طلب حذف بياناتكم في ظروف معينة</li>
            <li><strong>حق التقييد:</strong> طلب تقييد معالجة بياناتكم</li>
            <li><strong>حق النقل:</strong> الحصول على بياناتكم بصيغة قابلة للنقل</li>
            <li><strong>حق الاعتراض:</strong> الاعتراض على معالجة بياناتكم لأغراض تسويقية</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>7. ملفات تعريف الارتباط (Cookies)</h3>
          <p className={styles.legal__text}>
            نستخدم ملفات تعريف الارتباط لتحسين تجربتكم على موقعنا:
          </p>
          <ul className={styles.legal__list}>
            <li><strong>ملفات ضرورية:</strong> لضمان عمل الموقع بشكل صحيح</li>
            <li><strong>ملفات تحليلية:</strong> لفهم كيفية استخدام الموقع</li>
            <li><strong>ملفات وظيفية:</strong> لحفظ تفضيلاتكم</li>
            <li><strong>ملفات تسويقية:</strong> لعرض محتوى مخصص (بموافقتكم)</li>
          </ul>
          <p className={styles.legal__text}>
            يمكنكم إدارة إعدادات ملفات تعريف الارتباط من خلال متصفحكم.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>8. الاحتفاظ بالبيانات</h3>
          <p className={styles.legal__text}>
            نحتفظ ببياناتكم الشخصية للمدة اللازمة لتحقيق الأغراض المذكورة في هذه السياسة أو كما يتطلبه القانون:
          </p>
          <ul className={styles.legal__list}>
            <li><strong>بيانات الحساب:</strong> طوال فترة نشاط الحساب + 7 سنوات</li>
            <li><strong>المعاملات المالية:</strong> 10 سنوات وفقاً للمتطلبات التنظيمية</li>
            <li><strong>بيانات التسويق:</strong> حتى سحب الموافقة أو 3 سنوات</li>
            <li><strong>سجلات التواصل:</strong> 5 سنوات للمراجعة القانونية</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>9. نقل البيانات</h3>
          <p className={styles.legal__text}>
            قد تتم معالجة بياناتكم في مراكز بيانات خارج المملكة العربية السعودية. 
            نضمن أن جميع عمليات النقل تتم وفقاً للمعايير الدولية لحماية البيانات وبموافقة الجهات المختصة.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>10. خصوصية الأطفال</h3>
          <p className={styles.legal__text}>
            خدماتنا موجهة للبالغين فوق 18 سنة. لا نجمع عمداً معلومات شخصية من الأطفال دون 18 سنة. 
            إذا علمنا بجمع بيانات طفل دون قصد، سنقوم بحذفها فوراً.
          </p>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>11. تحديث السياسة</h3>
          <p className={styles.legal__text}>
            قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطركم بأي تغييرات جوهرية عبر:
          </p>
          <ul className={styles.legal__list}>
            <li>إشعار بارز على موقعنا الإلكتروني</li>
            <li>رسالة بريد إلكتروني إلى عنوانكم المسجل</li>
            <li>إشعار داخل التطبيق (إن وجد)</li>
          </ul>
        </div>

        <div className={styles.legal__section}>
          <h3 className={styles.legal__section_title}>12. الاتصال بنا</h3>
          <p className={styles.legal__text}>
            إذا كان لديكم أي أسئلة حول هذه السياسة أو ترغبون في ممارسة حقوقكم، يرجى التواصل معنا:
          </p>
          <div className={styles.legal__contact}>
            <p><strong>مسؤول حماية البيانات</strong></p>
            <p>البريد الإلكتروني: privacy@balance-realestate.com</p>
            <p>الهاتف: +966 11 123 4567</p>
            <p>العنوان: الرياض، المملكة العربية السعودية</p>
            <p>ساعات العمل: الأحد - الخميس، 9:00 ص - 6:00 م</p>
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
        <h3 className={styles.legal__section_title}>1. Introduction</h3>
        <p className={styles.legal__text}>
          Balance Real Estate Development Company respects your privacy and is committed to protecting your personal data. 
          This policy explains how we collect, use, and protect your personal information in accordance with the Personal Data Protection System 
          in Saudi Arabia.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>2. Data We Collect</h3>
        <p className={styles.legal__text}>
          We collect the following types of data:
        </p>
        <ul className={styles.legal__list}>
          <li><strong>Personal Data:</strong> Name, email, phone number, address</li>
          <li><strong>Financial Data:</strong> Payment and billing information (encrypted and secure)</li>
          <li><strong>Browsing Data:</strong> IP address, browser type, visit times</li>
          <li><strong>Preferences:</strong> Preferred property types, budget, desired location</li>
          <li><strong>Interaction Data:</strong> Pages visited, time spent, clicks</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>3. How We Use Data</h3>
        <p className={styles.legal__text}>
          We use your data for the following purposes:
        </p>
        <ul className={styles.legal__list}>
          <li>Providing and improving our real estate services</li>
          <li>Communicating with you regarding inquiries and requests</li>
          <li>Sending customized real estate offers based on your interests</li>
          <li>Processing financial transactions securely</li>
          <li>Analyzing website usage to improve user experience</li>
          <li>Complying with legal and regulatory requirements</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>4. Data Sharing</h3>
        <p className={styles.legal__text}>
          We do not sell, rent, or trade your personal data. We may share your data with:
        </p>
        <ul className={styles.legal__list}>
          <li><strong>Authorized Partners:</strong> Banks and financing companies for real estate transactions</li>
          <li><strong>Service Providers:</strong> IT and technical support companies</li>
          <li><strong>Legal Authorities:</strong> When requested by competent authorities</li>
          <li><strong>Developers:</strong> To coordinate buying and selling processes</li>
        </ul>
        <p className={styles.legal__text}>
          All third parties are bound to protect your data according to high security standards.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>5. Data Security</h3>
        <p className={styles.legal__text}>
          We implement advanced security measures to protect your data:
        </p>
        <ul className={styles.legal__list}>
          <li>Encryption of sensitive data using SSL/TLS standards</li>
          <li>Advanced protection systems against hacking and malware</li>
          <li>Limited access to authorized personnel only</li>
          <li>Regular and encrypted data backups</li>
          <li>Periodic security system reviews</li>
          <li>Continuous employee training on information security</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>6. Your Rights</h3>
        <p className={styles.legal__text}>
          You have the following rights regarding your personal data:
        </p>
        <ul className={styles.legal__list}>
          <li><strong>Right of Access:</strong> Request a copy of your personal data</li>
          <li><strong>Right of Correction:</strong> Update or correct inaccurate data</li>
          <li><strong>Right of Deletion:</strong> Request deletion of your data under certain circumstances</li>
          <li><strong>Right of Restriction:</strong> Request restriction of data processing</li>
          <li><strong>Right of Portability:</strong> Obtain your data in a portable format</li>
          <li><strong>Right of Objection:</strong> Object to processing your data for marketing purposes</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>7. Cookies</h3>
        <p className={styles.legal__text}>
          We use cookies to improve your experience on our website:
        </p>
        <ul className={styles.legal__list}>
          <li><strong>Essential Cookies:</strong> To ensure the website functions properly</li>
          <li><strong>Analytics Cookies:</strong> To understand how the website is used</li>
          <li><strong>Functional Cookies:</strong> To save your preferences</li>
          <li><strong>Marketing Cookies:</strong> To display customized content (with your consent)</li>
        </ul>
        <p className={styles.legal__text}>
          You can manage cookie settings through your browser.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>8. Data Retention</h3>
        <p className={styles.legal__text}>
          We retain your personal data for the time necessary to achieve the purposes mentioned in this policy or as required by law:
        </p>
        <ul className={styles.legal__list}>
          <li><strong>Account Data:</strong> Duration of account activity + 7 years</li>
          <li><strong>Financial Transactions:</strong> 10 years according to regulatory requirements</li>
          <li><strong>Marketing Data:</strong> Until consent withdrawal or 3 years</li>
          <li><strong>Communication Records:</strong> 5 years for legal review</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>9. Data Transfer</h3>
        <p className={styles.legal__text}>
          Your data may be processed in data centers outside Saudi Arabia. 
          We ensure all transfers comply with international data protection standards and with approval from competent authorities.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>10. Children's Privacy</h3>
        <p className={styles.legal__text}>
          Our services are directed to adults over 18 years. We do not knowingly collect personal information from children under 18. 
          If we learn of inadvertently collecting a child's data, we will delete it immediately.
        </p>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>11. Policy Updates</h3>
        <p className={styles.legal__text}>
          We may update this policy from time to time. We will notify you of any material changes through:
        </p>
        <ul className={styles.legal__list}>
          <li>Prominent notice on our website</li>
          <li>Email to your registered address</li>
          <li>In-app notification (if applicable)</li>
        </ul>
      </div>

      <div className={styles.legal__section}>
        <h3 className={styles.legal__section_title}>12. Contact Us</h3>
        <p className={styles.legal__text}>
          If you have any questions about this policy or wish to exercise your rights, please contact us:
        </p>
        <div className={styles.legal__contact}>
          <p><strong>Data Protection Officer</strong></p>
          <p>Email: privacy@balance-realestate.com</p>
          <p>Phone: +966 11 123 4567</p>
          <p>Address: Riyadh, Saudi Arabia</p>
          <p>Business Hours: Sunday - Thursday, 9:00 AM - 6:00 PM</p>
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

export default PrivacyPolicyContent;
