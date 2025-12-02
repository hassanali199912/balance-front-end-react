import React, { useState, useEffect, useRef } from 'react'
import { useLanguage, useAuth } from '../../contexts'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, User, UserCircle, Heart, Star, LogOut } from 'lucide-react'
import styles from '../../styles/components/Header.module.css'

const Header: React.FC = () => {
  const { changeLanguage, currentLanguage } = useLanguage()
  const { isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Dropdown menu items
  const dropdownItems = [
    {
      icon: UserCircle,
      label: currentLanguage.code === 'ar' ? 'الملف الشخصي' : 'Profile',
      onClick: () => {
        navigate('/profile?tab=profile')
        setIsUserDropdownOpen(false)
      }
    },
    {
      icon: Heart,
      label: currentLanguage.code === 'ar' ? 'الاهتمامات' : 'Interests',
      onClick: () => {
        navigate('/profile?tab=interests')
        setIsUserDropdownOpen(false)
      }
    },
    {
      icon: Star,
      label: currentLanguage.code === 'ar' ? 'المفضلة' : 'Favorites',
      onClick: () => {
        navigate('/profile?tab=favorites')
        setIsUserDropdownOpen(false)
      }
    },
    {
      icon: LogOut,
      label: currentLanguage.code === 'ar' ? 'تسجيل الخروج' : 'Sign Out',
      onClick: async () => {
        try {
          await logout()
          navigate('/')
        } catch {
          // Error toast is handled by AuthContext
          console.error('Logout failed')
        }
        setIsUserDropdownOpen(false)
      }
    }
  ]

  return (
    <header className={`${styles.header} ${isScrolled ? styles.header__scrolled : ''}`}>
      <div className={styles.header__container}>
        {/* Main navigation */}
        <div className={styles.header__nav}>
          {/* Logo */}
          <Link to="/" className={styles.header__logo}>
            <img src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753363614/Balance_-_logo_ekzzzs.png" alt="Balance Real Estate" className={styles.header__logoImg} />
            <div className={styles.header__logoText}>
              <span className={styles.header__logoName}>
                {currentLanguage.code === 'ar' ? 'بالنس' : 'Balance'}
              </span>
              <span className={styles.header__logoTag}>
                {currentLanguage.code === 'ar' ? 'للتطوير العقاري' : 'Real Estate Co'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.header__links}>
            <Link 
              to="/" 
              className={`${styles.header__link} ${location.pathname === '/' ? styles.active : ''}`}
            >
              {currentLanguage.code === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              to="/projects" 
              className={`${styles.header__link} ${location.pathname === '/projects' ? styles.active : ''}`}
            >
              {currentLanguage.code === 'ar' ? 'المشاريع' : 'Projects'}
            </Link>
            <Link 
              to="/about" 
              className={`${styles.header__link} ${location.pathname === '/about' ? styles.active : ''}`}
            >
              {currentLanguage.code === 'ar' ? 'عن الشركة' : 'About Us'}
            </Link>
            <Link 
              to="/contact" 
              className={`${styles.header__link} ${location.pathname === '/contact' ? styles.active : ''}`}
            >
              {currentLanguage.code === 'ar' ? 'اتصل بنا' : 'Contact US'}
            </Link>
          </nav>

          {/* Right side - Language and Auth */}
          <div className={styles.header__actions}>
            {/* Language Selector */}
            <button
              onClick={() => changeLanguage(currentLanguage.code === 'ar' ? 'en' : 'ar')}
              className={styles["header__lang-btn"]}
              aria-label="Change Language"
            >
              {currentLanguage.code === 'ar' ? (
                <>
                  <img src="https://cdn-icons-png.flaticon.com/128/206/206626.png" alt="English" style={{width: '20px', height: '20px'}} />
                  EN
                </>
              ) : (
                <>
                  <img src="https://cdn-icons-png.flaticon.com/128/14821/14821650.png" alt="العربية" style={{width: '20px', height: '20px'}} />
                  ع
                </>
              )}
              <ChevronDown size={14} />
            </button>
            
            {/* Auth Section - Show different views based on auth state */}
            {isAuthenticated ? (
              <div className={styles.header__userSection} ref={dropdownRef}>
                <button 
                  className={styles.header__userBtn} 
                  aria-label="User Menu"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <User size={20} />
                </button>
                
                {isUserDropdownOpen && (
                  <div className={styles.header__userDropdown}>
                    {dropdownItems.map((item, index) => (
                      <button
                        key={index}
                        className={styles.header__dropdownItem}
                        onClick={item.onClick}
                      >
                        <item.icon size={18} className={styles.header__dropdownIcon} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.header__authButtons}>
                <Link 
                  to="/signin"
                  className={styles["header__sign-in-btn"]}
                >
                  {currentLanguage.code === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
                <Link 
                  to="/signup"
                  className={styles["header__sign-up-btn"]}
                >
                  {currentLanguage.code === 'ar' ? 'حساب جديد' : 'Sign Up'}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles["header__menu-btn"]}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles["header__mobile-menu"]}>
            <div className={styles["header__mobile-header"]}>
              <Link to="/" className={styles.header__logo} onClick={() => setIsMenuOpen(false)}>
                <img src="https://res.cloudinary.com/dk2cdwufj/image/upload/v1753363614/Balance_-_logo_ekzzzs.png" alt="Balance Real Estate" className={styles.header__logoImg} />
                <div className={styles.header__logoText}>
                  <span className={styles.header__logoName}>
                    {currentLanguage.code === 'ar' ? 'بالنس' : 'Balance'}
                  </span>
                  <span className={styles.header__logoTag}>
                    {currentLanguage.code === 'ar' ? 'للتطوير العقاري' : 'Real Estate Co'}
                  </span>
                </div>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className={styles["header__close-btn"]}
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className={styles["header__mobile-nav"]}>
              <Link
                to="/"
                className={`${styles.header__link} ${location.pathname === '/' ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {currentLanguage.code === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <Link
                to="/projects"
                className={`${styles.header__link} ${location.pathname === '/projects' ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {currentLanguage.code === 'ar' ? 'المشاريع' : 'Projects'}
              </Link>
              <Link
                to="/about"
                className={`${styles.header__link} ${location.pathname === '/about' ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {currentLanguage.code === 'ar' ? 'عن الشركة' : 'About Us'}
              </Link>
              <Link
                to="/contact"
                className={`${styles.header__link} ${location.pathname === '/contact' ? styles.active : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {currentLanguage.code === 'ar' ? 'اتصل بنا' : 'Contact US'}
              </Link>
              
              <div className={styles["header__mobile-actions"]}>
                <button
                  onClick={() => {
                    changeLanguage(currentLanguage.code === 'ar' ? 'en' : 'ar')
                    setIsMenuOpen(false)
                  }}
                  className={styles["header__lang-btn"]}
                >
                  {currentLanguage.code === 'ar' ? (
                    <>
                      <img src="https://cdn-icons-png.flaticon.com/128/206/206626.png" alt="English" style={{width: '18px', height: '18px'}} />
                      EN
                    </>
                  ) : (
                    <>
                      <img src="https://cdn-icons-png.flaticon.com/128/14821/14821650.png" alt="العربية" style={{width: '18px', height: '18px'}} />
                      ع
                    </>
                  )}
                  <ChevronDown size={16} />
                </button>
                
                {isAuthenticated ? (
                  <div className={styles["header__mobile-user"]}>
                    {dropdownItems.map((item, index) => (
                      <button 
                        key={index}
                        className={`${styles.header__iconBtn} ${styles["header__mobile-icon"]}`}
                        onClick={item.onClick}
                      >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={styles["header__mobile-auth"]}>
                    <Link 
                      to="/signin"
                      className={styles["header__sign-in-btn"]}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {currentLanguage.code === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                    </Link>
                    <Link 
                      to="/signup"
                      className={styles["header__sign-up-btn"]}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {currentLanguage.code === 'ar' ? 'حساب جديد' : 'Sign Up'}
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header


