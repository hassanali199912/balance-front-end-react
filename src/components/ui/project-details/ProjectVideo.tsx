import React, { useState } from 'react';
import { Play, ExternalLink, VideoOff } from 'lucide-react';
import styles from '../../../styles/components/project-details/ProjectVideo.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface ProjectVideoProps {
  videoUrl?: string | null;
}

const ProjectVideo: React.FC<ProjectVideoProps> = ({ videoUrl }) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';
  const [isPlaying, setIsPlaying] = useState(false);

  const content = {
    en: {
      title: 'Preview Video',
      playVideo: 'Play Video',
      watchOnYoutube: 'Watch on YouTube',
      noVideo: 'No video available'
    },
    ar: {
      title: 'فيديو المعاينة',
      playVideo: 'تشغيل الفيديو',
      watchOnYoutube: 'مشاهدة على يوتيوب',
      noVideo: 'لا يوجد فيديو متاح'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  // ✅ تحقق من وجود الفيديو أولًا
  const hasVideo = !!videoUrl && videoUrl.trim() !== '';
  const videoId = hasVideo ? getYouTubeVideoId(videoUrl) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : '/assets/placeholder-video.jpg'; // 🔸 ممكن تغيرها لصورة ثابتة في المشروع

  const handlePlayVideo = () => {
    if (hasVideo && videoId) setIsPlaying(true);
  };

  return (
    <section className={styles.video} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.video__container}>
        <h2 className={styles.video__title}>{t.title}</h2>

        <div className={styles.video__content}>
          {hasVideo && videoId ? (
            !isPlaying ? (
              <div className={styles.video__thumbnail} onClick={handlePlayVideo}>
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className={styles.video__thumbnail_image}
                />
                <div className={styles.video__play_overlay}>
                  <button className={styles.video__play_btn}>
                    <Play size={48} fill="white" />
                  </button>
                  <span className={styles.video__play_text}>{t.playVideo}</span>
                </div>
              </div>
            ) : (
              <div className={styles.video__iframe_container}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Project Video"
                  className={styles.video__iframe}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          ) : (
            <div className={styles.video__no_video}>
              <VideoOff size={40} color="#9ca3af" />
              <p>{t.noVideo}</p>
            </div>
          )}

          {hasVideo && (
            <div className={styles.video__actions}>
              <a
                href={videoUrl!}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.video__youtube_link}
              >
                <ExternalLink size={20} />
                {t.watchOnYoutube}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectVideo;
