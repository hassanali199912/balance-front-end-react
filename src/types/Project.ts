export interface Project {
  id: string
  slug: string
  title: {
    ar: string
    en: string
  }
  description: {
    ar: string
    en: string
  }
  status: {
    ar: string
    en: string
  }
  type: {
    ar: string
    en: string
  }
  location: {
    ar: string
    en: string
  }
  totalUnits?: number
  completionDate?: string
  startingPrice?: number
  images: string[]
  features: {
    ar: string[]
    en: string[]
  }
  coordinates: {
    lat: number
    lng: number
  }
  amenities?: {
    ar: string[]
    en: string[]
  }
  developer?: {
    ar: string
    en: string
  }
}
