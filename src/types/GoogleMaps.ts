// Google Maps API Types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export interface GoogleMapsLocation {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  address: {
    ar: string;
    en: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  status: {
    ar: string;
    en: string;
  };
  type: {
    ar: string;
    en: string;
  };
}
