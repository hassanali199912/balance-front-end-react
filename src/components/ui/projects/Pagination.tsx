import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import styles from '../../../styles/components/projects/Pagination.module.css';
import { useLanguage } from '../../../contexts/useLanguage';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  const { currentLanguage } = useLanguage();
  const isArabic = currentLanguage.code === 'ar';

  const content = {
    en: {
      showing: 'Showing',
      to: 'to',
      of: 'of',
      results: 'results',
      previous: 'Previous',
      next: 'Next',
      first: 'First',
      last: 'Last'
    },
    ar: {
      showing: 'عرض',
      to: 'إلى',
      of: 'من',
      results: 'نتيجة',
      previous: 'السابق',
      next: 'التالي',
      first: 'الأول',
      last: 'الأخير'
    }
  };

  const t = isArabic ? content.ar : content.en;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages = [];
    const delta = 2;
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.pagination} dir={isArabic ? 'rtl' : 'ltr'}>
      <div className={styles.pagination__container}>
        {/* Results Info */}
        <div className={styles.pagination__info}>
          {isArabic ? (
            <>
              {t.showing} {startItem} {t.to} {endItem} {t.of} {totalItems} {t.results}
            </>
          ) : (
            <>
              {t.showing} {startItem} {t.to} {endItem} {t.of} {totalItems} {t.results}
            </>
          )}
        </div>

        {/* Navigation - only show if more than 1 page */}
        {totalPages > 1 && (
          <div className={styles.pagination__nav}>
          {/* First Page */}
          <button
            className={`${styles.pagination__btn} ${styles.pagination__btn_nav}`}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title={t.first}
          >
            {isArabic ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            <span className={styles.pagination__btn_text}>{t.first}</span>
          </button>

          {/* Previous Page */}
          <button
            className={`${styles.pagination__btn} ${styles.pagination__btn_nav}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            title={t.previous}
          >
            {isArabic ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            <span className={styles.pagination__btn_text}>{t.previous}</span>
          </button>

          {/* Page Numbers */}
          <div className={styles.pagination__pages}>
            {/* Show first page if not in visible range */}
            {visiblePages[0] > 1 && (
              <>
                <button
                  className={styles.pagination__btn}
                  onClick={() => onPageChange(1)}
                >
                  1
                </button>
                {visiblePages[0] > 2 && (
                  <span className={styles.pagination__dots}>...</span>
                )}
              </>
            )}

            {/* Visible page numbers */}
            {visiblePages.map((page) => (
              <button
                key={page}
                className={`${styles.pagination__btn} ${
                  page === currentPage ? styles.pagination__btn_active : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}

            {/* Show last page if not in visible range */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className={styles.pagination__dots}>...</span>
                )}
                <button
                  className={styles.pagination__btn}
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Page */}
          <button
            className={`${styles.pagination__btn} ${styles.pagination__btn_nav}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            title={t.next}
          >
            <span className={styles.pagination__btn_text}>{t.next}</span>
            {isArabic ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>

          {/* Last Page */}
          <button
            className={`${styles.pagination__btn} ${styles.pagination__btn_nav}`}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title={t.last}
          >
            <span className={styles.pagination__btn_text}>{t.last}</span>
            {isArabic ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
