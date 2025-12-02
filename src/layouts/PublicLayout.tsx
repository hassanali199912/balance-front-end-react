import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/shared/Header'
import Footer from '../components/shared/Footer'
import { CompanyInfo } from '../store/slices/CMSSlice'

interface CompanyInfoProps {
  companyInfo: CompanyInfo
}

const PublicLayout: React.FC<CompanyInfoProps> = ({ companyInfo }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer companyInfo={companyInfo} />
    </div>
  )
}

export default PublicLayout
