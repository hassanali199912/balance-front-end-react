// Project Details Components
export { default as ProjectBreadcrumb } from './ProjectBreadcrumb';
export { default as ProjectGallery } from './ProjectGallery';
export { default as ProjectInfo } from './ProjectInfo';
export { default as ProjectDescription } from './ProjectDescription';
export { default as ProjectOverview } from './ProjectOverview';
export { default as ProjectVideo } from './ProjectVideo';
export { default as ProjectLocationMap } from './ProjectLocationMap';
export { default as RegisterInterest } from './RegisterInterest';
export { default as ProjectProperties } from './ProjectProperties';

// Types
export interface ProjectData {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  images: string[];
  category: string;
  categoryAr: string;
  isFavorited: boolean;
  rating: number;
  completionDate: string;
  description: string;
  descriptionAr: string;
  overview: ProjectOverview;
  videoUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  addressAr: string;
  properties: ProjectDetailProperty[];
}

export interface ProjectOverview {
  totalUnits: number;
  totalArea: string;
  parkingSpaces: number;
  elevators: number;
  features: string[];
  featuresAr: string[];
}

export interface ProjectDetailProperty {
  id: string | Number;
  name: string;
  nameAr: string;
  type: string;
  typeAr: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  building: string;
  buildingAr: string;
  features: string[];
  featuresAr: string[];
  images: string[];
  status: 'available' | 'sold' | 'reserved';
  isFavorited?: boolean;
}

export interface Unit {
  id: string;
  name: string;
  nameAr: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'sold' | 'reserved';
  price: number;
  area: number;
  bedrooms: number;
}