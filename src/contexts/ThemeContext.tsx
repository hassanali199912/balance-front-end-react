import React, { createContext, useState } from 'react'
import type { Theme } from '../types'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export { ThemeContext }

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ mode: 'light' })

  const toggleTheme = () => {
    setTheme(prev => ({ mode: prev.mode === 'light' ? 'dark' : 'light' }))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
