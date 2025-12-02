export interface Property {
  id: string
  title: string
  description: string
  price: number
  area: number
  bedrooms: number
  bathrooms: number
  location: string
  type: 'residential' | 'commercial' | 'investment' | 'luxury'
  status: 'for_sale' | 'for_rent' | 'sold' | 'rented'
  images: string[]
  features: string[]
  coordinates: {
    lat: number
    lng: number
  }
  projectName?: string
  projectNameAr?: string
  projectSlug?: string
  createdAt: string
  updatedAt: string
}
