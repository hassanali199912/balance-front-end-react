import * as React from 'react';
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/ui/common/LoadingSpinner';
import PageBreadcrumb from '../../components/ui/shared/PageBreadcrumb';
import ProjectGallery from '../../components/ui/project-details/ProjectGallery';
import ProjectInfo from '../../components/ui/project-details/ProjectInfo';
import ProjectDescription from '../../components/ui/project-details/ProjectDescription';
import ProjectOverview from '../../components/ui/project-details/ProjectOverview';
import ProjectVideo from '../../components/ui/project-details/ProjectVideo';
import ProjectLocationMap from '../../components/ui/project-details/ProjectLocationMap';
import ProjectProperties from '../../components/ui/project-details/ProjectProperties';
import RegisterInterest from '../../components/ui/project-details/RegisterInterest';
import { useLanguage } from '../../contexts/useLanguage';
import type { ProjectDetailProperty } from '../../components/ui/project-details/index';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getProjectById } from '../../store/slices/ProjectSlice';
import { getUnitsAPi } from '../../store/slices/UnitSlice';





const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  //#region Code

  const content = {
    en: {
      loadingProject: 'Loading Project Details...'
    },
    ar: {
      loadingProject: 'جاري تحميل تفاصيل المشروع...'
    }
  };
  const t = isArabic ? content.ar : content.en;



  const handleFavoriteToggle = () => {
    // Optional: Update local state if needed for any UI sync
    // The actual favorites are handled by the components themselves
    console.log('Project favorite toggled');
  };

  const handlePropertyFavoriteToggle = (propertyId: string) => {
    // Optional: Update local state if needed for any UI sync  
    // The actual favorites are handled by the components themselves
    console.log('Property favorite toggled:', propertyId);
  };


  //#endregion Code 


  const { single: {
    details, loading: stateloading, error
  } } = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch<AppDispatch>();

  const { unit: {
    data: projectUnits, loading: unitLoading, error: unitError
  } } = useSelector((state: RootState) => state.units);


  useEffect(() => {
    if (!id) {
      navigate("/notFound");
      return;
    }

    const projectId = Number(id);
    if (isNaN(projectId) || projectId <= 0) {
      navigate("/notFound");
      return;
    }
    dispatch(getProjectById(projectId)).then(() => {
      dispatch(getUnitsAPi({
        ProjectId: projectId
      }))
    })
      .catch(() => {
        navigate("/notFound");
      });
  }, [id, dispatch, navigate]);

  useEffect(() => {
    if (!stateloading && error) {
      navigate("/notFound");
    }
  }, [stateloading, error, navigate]);


  if (stateloading) {
    return (
      <LoadingSpinner
        text={t.loadingProject}
        size="large"
        overlay={true}
      />
    );
  }


  return <>

    {details && <div className="project-details-page">
      {/* Breadcrumb with Hero Background */}
      <PageBreadcrumb
        title={details?.nameEn}
        titleAr={details?.nameAr}
        location={details?.locationEn}
        locationAr={details?.locationAr}
        backgroundImage={details?.mainImageUrl}
      />

      {/* Project Gallery */}
      <ProjectGallery images={details?.images} />

      {/* Project Info */}
      <ProjectInfo
        project={{
          id: details?.id,
          name: details?.nameEn,
          nameAr: details?.nameAr,
          location: details?.locationEn,
          locationAr: details?.locationAr,
          category: details?.typeNameEn,
          categoryAr: details?.typeName,
          isFavorited: details?.isFeatured,
          completionDate: details?.estimatedCompletionDate
        }}
        onFavoriteToggle={handleFavoriteToggle}
      />

      {/* Project Description */}
      <ProjectDescription
        description={details?.descriptionEn}
        descriptionAr={details?.descriptionAr}
      />

      {/* Project Overview */}
      <ProjectOverview overview={{
        elevators: details?.elevatorsCount,
        features: details?.features,
        parkingSpaces: details?.parkingSpots,
        totalArea: details?.area + `${isArabic ? details?.areaUnitAr : details?.areaUnitEn}`,
        totalUnits: details?.countOfUnits
      }} />

      {/* Project Video */}
      <ProjectVideo videoUrl={details?.youtubeVideoUrl} />

      {/* Project Location Map */}
      <ProjectLocationMap
        coordinates={{
          lat: details?.latitude,
          lng: details?.longitude
        }}
        address={`${details?.locationEn}`}
        addressAr={`${details?.locationAr}`}
        projectName={details?.nameEn}
        projectNameAr={details?.nameAr}
      />

      {/* Available Properties */}
      {projectUnits && projectUnits.items.length !== 0 &&
        <ProjectProperties
          properties={projectUnits.items}
          onFavoriteToggle={handlePropertyFavoriteToggle}
        />
      }


      {/* Register Interest */}
      <RegisterInterest
        projectName={details?.nameEn}
        projectNameAr={details?.nameAr}
        // onSubmit={handleInterestSubmit}
        projectId={id}
      />
    </div>}

  </>
};

export default ProjectDetailsPage;