import React from "react";
import styles from "../../../styles/components/home/FeaturedProjects.module.css";
import "../../../styles/components/common/skelton.css"; 

const ProjectCardSkeleton: React.FC = () => {
    return (
        <div className={`${styles.featured__card} skeleton-card`}>
            {/* صورة */}
            <div className={`${styles["featured__card-image"]} skeleton`}>
                <div className="skeleton-box img-skeleton" />
            </div>

            {/* المحتوى */}
            <div className={styles["featured__card-content"]}>
                <div className="skeleton-box title-skeleton" />
                <div className="skeleton-box location-skeleton" />
                <div className="skeleton-box small-skeleton" />
                <div className="skeleton-box small-skeleton" />
                <div className="skeleton-box button-skeleton" />
            </div>
        </div>
    );
};

export default ProjectCardSkeleton;
