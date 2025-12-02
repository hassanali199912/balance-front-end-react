import React from 'react'
import { 
  HeroSection, 
  FeaturedProjects, 
  AboutUsSection, 
  OurLocations 
} from '../../components/ui/home'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProjects />
      <OurLocations />
      <AboutUsSection />
    </div>
  )
}
export default HomePage
