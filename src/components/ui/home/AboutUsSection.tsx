import React from 'react';
import { ArrowRight, ArrowLeft, Users, Building, Target } from 'lucide-react';
import styles from '../../../styles/components/home/AboutUsSection.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

const AboutUsSection: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      subtitle: 'Who We Are',
      title: 'About Balance Real Estate',
      description: 'Balance Real Estate is a modern development company committed to creating exceptional living and working spaces in Saudi Arabia. We focus on innovative design, quality construction, and sustainable development practices.',
      secondDescription: 'Our team combines fresh perspectives with industry expertise to deliver projects that meet the evolving needs of today\'s communities and businesses.',
      learnMore: 'Learn More About Us',
      features: [
        {
          icon: 'building',
          title: 'Modern Design',
          description: 'Contemporary architecture with innovative solutions'
        },
        {
          icon: 'target',
          title: 'Quality Focus',
          description: 'Commitment to excellence in every detail'
        },
        {
          icon: 'users',
          title: 'Expert Team',
          description: 'Skilled professionals dedicated to success'
        },
        {
          icon: 'award',
          title: 'Customer First',
          description: 'Your satisfaction is our priority'
        }
      ]
    },
    ar: {
      subtitle: 'من نحن',
      title: 'عن شركة بالانس العقارية',
      description: 'شركة بالانس العقارية هي شركة تطوير حديثة ملتزمة بإنشاء مساحات معيشة وعمل استثنائية في المملكة العربية السعودية. نركز على التصميم المبتكر والبناء عالي الجودة وممارسات التطوير المستدام.',
      secondDescription: 'يجمع فريقنا بين وجهات النظر الحديثة والخبرة في الصناعة لتقديم مشاريع تلبي الاحتياجات المتطورة لمجتمعات وشركات اليوم.',
      learnMore: 'تعرف أكثر عنا',
      features: [
        {
          icon: 'building',
          title: 'تصميم عصري',
          description: 'عمارة معاصرة مع حلول مبتكرة'
        },
        {
          icon: 'target',
          title: 'التركيز على الجودة',
          description: 'الالتزام بالتميز في كل التفاصيل'
        },
        {
          icon: 'users',
          title: 'فريق خبير',
          description: 'محترفون مهرة مكرسون للنجاح'
        },
        {
          icon: 'award',
          title: 'العميل أولاً',
          description: 'رضاكم هو أولويتنا'
        }
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'building':
        return <Building size={24} />;
      case 'award':
        return <Target size={24} />;
      case 'users':
        return <Users size={24} />;
      case 'target':
        return <Target size={24} />;
      default:
        return <Building size={24} />;
    }
  };

  const handleLearnMore = () => {
    // التنقل إلى صفحة About Us
    window.location.href = '/about';
  };

  return (
    <section className={styles.about} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.about__container}>
        {/* Section Header */}
        <div className={styles.about__header}>
          <div className={styles.about__subtitle}>
            {t.subtitle}
          </div>
          <h2 className={styles.about__title}>
            {t.title}
          </h2>
          <p className={styles.about__header_description}>
            {t.description}
          </p>
        </div>

        {/* Main Content */}
        <div className={styles.about__content}>
          {/* Text Content */}
          <div className={styles.about__text}>
            <p className={styles.about__description_secondary}>
              {t.secondDescription}
            </p>

            {/* Features */}
            <div className={styles.about__features}>
              {t.features.map((feature, index) => (
                <div key={index} className={styles.about__feature}>
                  <div className={styles.about__feature_icon}>
                    {getIcon(feature.icon)}
                  </div>
                  <div className={styles.about__feature_content}>
                    <h4 className={styles.about__feature_title}>
                      {feature.title}
                    </h4>
                    <p className={styles.about__feature_description}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              className={styles.about__cta}
              onClick={handleLearnMore}
            >
              <span>{t.learnMore}</span>
              {isArabic ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </button>
          </div>

          {/* Image Content */}
          <div className={styles.about__image}>
            <div className={styles.about__image_container}>
              <img 
                src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753350813/Home-aboutus_hvy5su.png" 
                alt={t.title}
                className={styles.about__image_main}
              />
              
              {/* Decorative Elements */}
              <div className={styles.about__image_decoration_1}></div>
              <div className={styles.about__image_decoration_2}></div>
              
              {/* Floating Card */}
              <div className={styles.about__floating_card}>
                <div className={styles.about__floating_card_icon}>
                  <Building size={24} />
                </div>
                <div className={styles.about__floating_card_content}>
                  <div className={styles.about__floating_card_title}>
                    {isArabic ? 'جودة عالية' : 'High Quality'}
                  </div>
                  <div className={styles.about__floating_card_subtitle}>
                    {isArabic ? 'في كل مشروع' : 'In Every Project'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
