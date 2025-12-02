import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider, ThemeProvider, ToastProvider, AuthProvider, FavoritesProvider } from './contexts'
import ToastContainer from './components/ui/ToastContainer'
import ProtectedRoute from './components/auth/ProtectedRoute'
import GoogleAuthCallback from './components/auth/GoogleAuthCallback'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { AppDispatch, RootState, store } from "./store/index";
import { Provider as StoreProvider, useDispatch, useSelector } from "react-redux";
// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/public/HomePage'))
const ProjectsPage = React.lazy(() => import('./pages/public/ProjectsPage'))
const PropertiesPage = React.lazy(() => import('./pages/public/PropertiesPage'))
const ProjectDetailsPage = React.lazy(() => import('./pages/public/ProjectDetailsPage'))
const PropertyDetailsPage = React.lazy(() => import('./pages/public/PropertyDetailsPage'))
const ContactPage = React.lazy(() => import('./pages/public/ContactPage'))
const AboutPage = React.lazy(() => import('./pages/public/AboutPage'))
const NotFoundPage = React.lazy(() => import('./pages/public/NotFoundPage'))


// Auth Routes - lazy loaded
const SignInPage = React.lazy(() => import('./pages/auth/SignInPage'))
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'))
const ForgotPasswordPage = React.lazy(() => import('./pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'))

// Dashboard Routes - lazy loaded
const ProfilePage = React.lazy(() => import('./pages/dashboard/ProfilePage'))

// Shared Layout
import PublicLayout from './layouts/PublicLayout'
import { getCMSData, reset } from './store/slices/CMSSlice'

function App() {


  const { data, error, loading } = useSelector((state: RootState) => state.Information);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // reset Company Information
    dispatch(reset());
    // get Company Information
    dispatch(getCMSData());
  }, [])

  useEffect(() => {

    loading && console.log("CMS Loading ", loading);
    data && console.log("CMS Data ", data);
    error && console.log("CMS Error ", error);

  }, [data, loading, error])



  if (loading) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <LoadingSpinner />
        </LanguageProvider>
      </ThemeProvider>
    );
  }


  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Router>
                <div className="app">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      {/* Google OAuth Callback Route (no layout needed) */}
                      <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
                      <Route path="/" element={<PublicLayout companyInfo={data} />}>
                        <Route index element={<HomePage />} />
                        <Route path="projects" element={<ProjectsPage />} />
                        <Route path="properties" element={<PropertiesPage />} />
                        <Route path="projects/:id" element={<ProjectDetailsPage />} />
                        <Route path="properties/:id" element={<PropertyDetailsPage />} />
                        <Route path="contact" element={<ContactPage companyInfo={data} />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="signin" element={
                          <ProtectedRoute requireAuth={false}>
                            <SignInPage />
                          </ProtectedRoute>
                        } />
                        <Route path="signup" element={
                          <ProtectedRoute requireAuth={false}>
                            <SignUpPage />
                          </ProtectedRoute>
                        } />
                        <Route path="forgot-password" element={
                          <ProtectedRoute requireAuth={false}>
                            <ForgotPasswordPage />
                          </ProtectedRoute>
                        } />
                        <Route path="reset-password" element={
                          <ProtectedRoute requireAuth={false}>
                            <ResetPasswordPage />
                          </ProtectedRoute>
                        } />
                        <Route path="profile" element={
                          <ProtectedRoute requireAuth={true}>
                            <ProfilePage />
                          </ProtectedRoute>
                        } />
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
                    </Routes>
                  </Suspense>
                  <ToastContainer />
                </div>
              </Router>
            </FavoritesProvider>
          </AuthProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
