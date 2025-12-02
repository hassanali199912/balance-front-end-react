import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  isArabic?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = '600px',
  isArabic = false 
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={styles.modal__overlay} 
      onClick={onClose}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div 
        className={styles.modal__container}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>{title}</h2>
          <button 
            className={styles.modal__close_btn}
            onClick={onClose}
            aria-label={isArabic ? 'إغلاق' : 'Close'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className={styles.modal__content}>
          {children}
        </div>

        {/* Modal Footer */}
        <div className={styles.modal__footer}>
          <button 
            className={styles.modal__close_footer_btn}
            onClick={onClose}
          >
            {isArabic ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
