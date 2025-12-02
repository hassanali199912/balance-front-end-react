import { useContext } from 'react';
import { ToastContext, type ToastContextType } from './ToastContextDef';

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Export types for compatibility
export type { ToastType, ToastData, ToastContextType } from './ToastContextDef';
