export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
}

export interface InterestFormData {
  name: string
  email: string
  phone: string
  contactMethod: 'email' | 'phone' | 'both'
  message?: string
  visitDate?: string
  visitTime?: string
}
