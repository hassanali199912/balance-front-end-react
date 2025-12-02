import React, { createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Language } from '../types'

interface LanguageContextType {
  currentLanguage: Language
  changeLanguage: (lang: 'ar' | 'en') => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export { LanguageContext }

const languages: Record<string, Language> = {
  ar: { code: 'ar', name: 'العربية', direction: 'rtl' },
  en: { code: 'en', name: 'English', direction: 'ltr' }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages.ar)

  useEffect(() => {
    const lang = i18n.language || 'ar'
    setCurrentLanguage(languages[lang] || languages.ar)
    
    // Update HTML attributes
    document.documentElement.lang = lang
    document.documentElement.dir = languages[lang]?.direction || 'rtl'
  }, [i18n.language])

  const changeLanguage = (lang: 'ar' | 'en') => {
    i18n.changeLanguage(lang)
    setCurrentLanguage(languages[lang])
    
    // Update HTML attributes
    document.documentElement.lang = lang
    document.documentElement.dir = languages[lang].direction
  }

  const isRTL = currentLanguage.direction === 'rtl'

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}
