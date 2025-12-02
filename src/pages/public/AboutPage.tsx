import React from 'react';
import { Target, Eye, Award, Users, Building, Heart, Shield, MapPin } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import PageBreadcrumb from '../../components/ui/shared/PageBreadcrumb';
import styles from '../../styles/components/public/About.module.css';

const AboutPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      pageTitle: 'About Balance Real Estate',
      pageSubtitle: 'Building dreams, creating communities, and shaping the future of real estate in Saudi Arabia',
      ourStory: 'Our Story',
      storyContent: 'Founded in 2010, Balance Real Estate has been at the forefront of Saudi Arabia\'s real estate transformation. We began with a simple vision: to create exceptional living and working spaces that enhance people\'s lives while contributing to the Kingdom\'s Vision 2030. Over the years, we have grown from a small family business to one of the most trusted names in Saudi real estate development.',
      ourMission: 'Our Mission',
      missionContent: 'To develop innovative, sustainable, and high-quality real estate projects that meet the evolving needs of modern Saudi society while preserving our cultural heritage and contributing to economic growth.',
      ourVision: 'Our Vision',
      visionContent: 'To be the leading real estate developer in Saudi Arabia, recognized for our commitment to excellence, innovation, and customer satisfaction, while playing a pivotal role in shaping the future of urban development in the Kingdom.',
      ourValues: 'Our Values',
      whyChooseUs: 'Why Choose Balance Real Estate?',
      stats: {
        projectsCompleted: 'Projects Completed',
        yearsExperience: 'Years of Experience',
        happyClients: 'Happy Clients',
        citiesCovered: 'Cities Covered'
      },
      values: [
        {
          title: 'Excellence',
          description: 'We strive for the highest standards in every project we undertake, ensuring quality that exceeds expectations.'
        },
        {
          title: 'Innovation',
          description: 'We embrace cutting-edge technology and creative solutions to deliver modern, sustainable developments.'
        },
        {
          title: 'Integrity',
          description: 'We conduct business with transparency, honesty, and ethical practices in all our dealings.'
        },
        {
          title: 'Customer Focus',
          description: 'Our clients are at the heart of everything we do, and we are committed to exceeding their expectations.'
        }
      ],
      features: [
        {
          title: 'Premium Locations',
          description: 'Strategic locations in prime areas across major Saudi cities'
        },
        {
          title: 'Innovative Design',
          description: 'Modern architectural solutions that blend functionality with aesthetics'
        },
        {
          title: 'Sustainable Development',
          description: 'Eco-friendly construction practices aligned with Saudi Vision 2030'
        },
        {
          title: 'Investment Security',
          description: 'Proven track record of delivering high-value, appreciating properties'
        },
        {
          title: 'Customer Service',
          description: 'Dedicated support team ensuring exceptional client experience'
        },
        {
          title: 'Quality Assurance',
          description: 'Rigorous quality control processes and premium material selection'
        }
      ],
      timeline: {
        title: 'Our Journey',
        events: [
          {
            year: '2010',
            title: 'Company Founded',
            description: 'Balance Real Estate was established with a vision to transform Saudi real estate'
          },
          {
            year: '2013',
            title: 'First Major Project',
            description: 'Completed our first residential complex in Riyadh with 200 units'
          },
          {
            year: '2016',
            title: 'Expansion',
            description: 'Expanded operations to Jeddah and Dammam'
          },
          {
            year: '2019',
            title: 'Innovation Award',
            description: 'Received Saudi Real Estate Innovation Award'
          },
          {
            year: '2022',
            title: 'Sustainability Focus',
            description: 'Launched green building initiative aligned with Vision 2030'
          },
          {
            year: '2024',
            title: 'Digital Transformation',
            description: 'Implemented cutting-edge PropTech solutions'
          }
        ]
      }
    },
    ar: {
      pageTitle: 'حول بالنس العقارية',
      pageSubtitle: 'نبني الأحلام، ننشئ المجتمعات، ونشكل مستقبل العقارات في المملكة العربية السعودية',
      ourStory: 'قصتنا',
      storyContent: 'تأسست بالنس العقارية في عام 2010، وكانت في طليعة التحول العقاري في المملكة العربية السعودية. بدأنا برؤية بسيطة: إنشاء مساحات معيشة وعمل استثنائية تعزز حياة الناس مع المساهمة في رؤية المملكة 2030. على مر السنين، نمونا من شركة عائلية صغيرة لنصبح واحدة من أكثر الأسماء الموثوقة في تطوير العقارات السعودية.',
      ourMission: 'رسالتنا',
      missionContent: 'تطوير مشاريع عقارية مبتكرة ومستدامة وعالية الجودة تلبي الاحتياجات المتطورة للمجتمع السعودي الحديث مع الحفاظ على تراثنا الثقافي والمساهمة في النمو الاقتصادي.',
      ourVision: 'رؤيتنا',
      visionContent: 'أن نكون المطور العقاري الرائد في المملكة العربية السعودية، معترف بالتزامنا بالتميز والابتكار ورضا العملاء، مع لعب دور محوري في تشكيل مستقبل التطوير العمراني في المملكة.',
      ourValues: 'قيمنا',
      whyChooseUs: 'لماذا تختار بالنس العقارية؟',
      stats: {
        projectsCompleted: 'مشروع مكتمل',
        yearsExperience: 'سنة من الخبرة',
        happyClients: 'عميل راضٍ',
        citiesCovered: 'مدينة نخدمها'
      },
      values: [
        {
          title: 'التميز',
          description: 'نسعى لأعلى المعايير في كل مشروع نتولاه، ونضمن جودة تفوق التوقعات.'
        },
        {
          title: 'الابتكار',
          description: 'نتبنى أحدث التقنيات والحلول الإبداعية لتقديم مشاريع حديثة ومستدامة.'
        },
        {
          title: 'النزاهة',
          description: 'نمارس الأعمال بشفافية وصدق وممارسات أخلاقية في جميع تعاملاتنا.'
        },
        {
          title: 'التركيز على العميل',
          description: 'عملاؤنا في قلب كل ما نقوم به، ونحن ملتزمون بتجاوز توقعاتهم.'
        }
      ],
      features: [
        {
          title: 'مواقع مميزة',
          description: 'مواقع استراتيجية في المناطق الرئيسية عبر المدن السعودية الكبرى'
        },
        {
          title: 'تصميم مبتكر',
          description: 'حلول معمارية حديثة تمزج بين الوظائف والجماليات'
        },
        {
          title: 'التطوير المستدام',
          description: 'ممارسات بناء صديقة للبيئة متماشية مع رؤية السعودية 2030'
        },
        {
          title: 'أمان الاستثمار',
          description: 'سجل حافل في تقديم عقارات عالية القيمة ومتزايدة التقدير'
        },
        {
          title: 'خدمة العملاء',
          description: 'فريق دعم مخصص يضمن تجربة عملاء استثنائية'
        },
        {
          title: 'ضمان الجودة',
          description: 'عمليات مراقبة جودة صارمة واختيار مواد فاخرة'
        }
      ],
      timeline: {
        title: 'رحلتنا',
        events: [
          {
            year: '2010',
            title: 'تأسيس الشركة',
            description: 'تأسست بالنس العقارية برؤية لتحويل العقارات السعودية'
          },
          {
            year: '2013',
            title: 'أول مشروع كبير',
            description: 'أتممنا أول مجمع سكني في الرياض بـ 200 وحدة'
          },
          {
            year: '2016',
            title: 'التوسع',
            description: 'توسعت العمليات إلى جدة والدمام'
          },
          {
            year: '2019',
            title: 'جائزة الابتكار',
            description: 'حصلنا على جائزة الابتكار العقاري السعودي'
          },
          {
            year: '2022',
            title: 'التركيز على الاستدامة',
            description: 'أطلقنا مبادرة البناء الأخضر متماشية مع رؤية 2030'
          },
          {
            year: '2024',
            title: 'التحول الرقمي',
            description: 'طبقنا حلول تقنية عقارية متطورة'
          }
        ]
      }
    }
  };

  const t = isArabic ? content.ar : content.en;
  const valueIcons = [Target, Eye, Shield, Heart];

  return (
    <div className={styles.about} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Page Breadcrumb */}
      <PageBreadcrumb 
        title={t.pageTitle}
        titleAr={t.pageTitle}
        backgroundImage="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753360975/Image-7_zzi2sl.jpg"
      />

      {/* Stats Section */}
      <section className={styles.about__stats}>
        <div className={styles.about__stats_container}>
          <div className={styles.about__stats_grid}>
            <div className={styles.about__stat_card}>
              <div className={styles.about__stat_icon}>
                <Building size={32} />
              </div>
              <div className={styles.about__stat_content}>
                <div className={styles.about__stat_value}>150+</div>
                <div className={styles.about__stat_label}>{t.stats.projectsCompleted}</div>
              </div>
            </div>
            <div className={styles.about__stat_card}>
              <div className={styles.about__stat_icon}>
                <Award size={32} />
              </div>
              <div className={styles.about__stat_content}>
                <div className={styles.about__stat_value}>15+</div>
                <div className={styles.about__stat_label}>{t.stats.yearsExperience}</div>
              </div>
            </div>
            <div className={styles.about__stat_card}>
              <div className={styles.about__stat_icon}>
                <Users size={32} />
              </div>
              <div className={styles.about__stat_content}>
                <div className={styles.about__stat_value}>5000+</div>
                <div className={styles.about__stat_label}>{t.stats.happyClients}</div>
              </div>
            </div>
            <div className={styles.about__stat_card}>
              <div className={styles.about__stat_icon}>
                <MapPin size={32} />
              </div>
              <div className={styles.about__stat_content}>
                <div className={styles.about__stat_value}>12+</div>
                <div className={styles.about__stat_label}>{t.stats.citiesCovered}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.about__section}>
        <div className={styles.about__section_container}>
          <div className={styles.about__section_grid}>
            <div className={styles.about__section_content}>
              <h2 className={styles.about__section_title}>{t.ourStory}</h2>
              <p className={styles.about__section_text}>{t.storyContent}</p>
            </div>
            <div className={styles.about__section_image}>
              <img 
                src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753360976/rikaz-basyouni-SSdOb-uU0iM-unsplash_oaerxi.jpg" 
                alt="Our Story"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://res.cloudinary.com/dk2cdwufj/image/upload/v1753360976/rikaz-basyouni-SSdOb-uU0iM-unsplash_oaerxi.jpg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.about__mission_vision}>
        <div className={styles.about__mv_container}>
          <div className={styles.about__mv_grid}>
            <div className={styles.about__mv_card}>
              <div className={styles.about__mv_icon}>
                <Target size={40} />
              </div>
              <h3 className={styles.about__mv_title}>{t.ourMission}</h3>
              <p className={styles.about__mv_text}>{t.missionContent}</p>
            </div>
            <div className={styles.about__mv_card}>
              <div className={styles.about__mv_icon}>
                <Eye size={40} />
              </div>
              <h3 className={styles.about__mv_title}>{t.ourVision}</h3>
              <p className={styles.about__mv_text}>{t.visionContent}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.about__values}>
        <div className={styles.about__section_container}>
          <h2 className={styles.about__section_title}>{t.ourValues}</h2>
          <div className={styles.about__values_grid}>
            {t.values.map((value, index) => {
              const IconComponent = valueIcons[index];
              return (
                <div key={index} className={styles.about__value_card}>
                  <div className={styles.about__value_icon}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className={styles.about__value_title}>{value.title}</h3>
                  <p className={styles.about__value_text}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.about__features}>
        <div className={styles.about__section_container}>
          <h2 className={styles.about__section_title}>{t.whyChooseUs}</h2>
          <div className={styles.about__features_grid}>
            {t.features.map((feature, index) => (
              <div key={index} className={styles.about__feature_card}>
                <h3 className={styles.about__feature_title}>{feature.title}</h3>
                <p className={styles.about__feature_text}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={styles.about__timeline}>
        <div className={styles.about__section_container}>
          <h2 className={styles.about__section_title}>{t.timeline.title}</h2>
          <div className={styles.about__timeline_container}>
            {t.timeline.events.map((event, index) => (
              <div key={index} className={styles.about__timeline_item}>
                <div className={styles.about__timeline_marker}>
                  <span className={styles.about__timeline_year}>{event.year}</span>
                </div>
                <div className={styles.about__timeline_content}>
                  <h3 className={styles.about__timeline_title}>{event.title}</h3>
                  <p className={styles.about__timeline_text}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.about__cta}>
        <div className={styles.about__cta_container}>
          <div className={styles.about__cta_content}>
            <h2 className={styles.about__cta_title}>
              {isArabic ? 'هل أنت مستعد للانضمام إلى عائلة بالنس؟' : 'Ready to Join the Balance Family?'}
            </h2>
            <p className={styles.about__cta_text}>
              {isArabic 
                ? 'اكتشف مشاريعنا الحصرية واستثمر في مستقبلك العقاري اليوم'
                : 'Discover our exclusive projects and invest in your real estate future today'
              }
            </p>
            <div className={styles.about__cta_buttons}>
              <a href="/projects" className={styles.about__cta_btn_primary}>
                {isArabic ? 'استكشف مشاريعنا' : 'Explore Our Projects'}
              </a>
              <a href="/contact" className={styles.about__cta_btn_secondary}>
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
