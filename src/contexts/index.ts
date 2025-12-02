// Barrel export for contexts
export { useAuth } from './useAuth';
export { useLanguage } from './useLanguage';
export { useTheme } from './useTheme';
export { useToast } from './useToast';
export { useFavorites } from './useFavorites';

export { AuthProvider } from './AuthContext';
export { LanguageProvider } from './LanguageContext';
export { ThemeProvider } from './ThemeContext';
export { ToastProvider } from './ToastContext';
export { FavoritesProvider } from './FavoritesContext';

export type { ToastType, ToastData, ToastContextType } from './ToastContextDef';
