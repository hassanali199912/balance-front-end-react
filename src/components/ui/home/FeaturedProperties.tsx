import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart, Eye } from 'lucide-react'
import styles from '../../../styles/components/home/FeaturedProperties.module.css'

const FeaturedProperties: React.FC = () => {
  const properties = [
    {
      id: 1,
      title: 'Luxury Villa in Riyadh',
      location: 'Al Nakheel District, Riyadh',
      price: '2,500,000',
      currency: 'SAR',
      type: 'For Sale',
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
      image: 'https://images.adsttc.com/media/images/5eee/50f9/b357/658c/7f00/0125/large_jpg/00FI_V_COMPOUND_Cover.jpg?1592676562',
      features: ['Swimming Pool', 'Garden', 'Garage', 'Modern Kitchen'],
      rating: 4.9
    },
    {
      id: 2,
      title: 'Modern Apartment',
      location: 'King Abdullah District, Jeddah',
      price: '1,200,000',
      currency: 'SAR',
      type: 'For Sale',
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      image: 'https://www.shutterstock.com/image-photo/cityscape-residential-area-modern-apartment-600nw-1723278520.jpg',
      features: ['Sea View', 'Balcony', 'Parking', 'Gym Access'],
      rating: 4.7
    },
    {
      id: 3,
      title: 'Commercial Building',
      location: 'Business District, Dammam',
      price: '15,000',
      currency: 'SAR',
      type: 'For Rent',
      bedrooms: 0,
      bathrooms: 8,
      area: 800,
      image: 'https://normarch.com/wp-content/uploads/2018/05/thumb_X-ARCHITECTURE-aaaaa-La-Vista-Compound-north-coast-QU-N.RGB_color.0000.jpg.jpg.jpg',
      features: ['Prime Location', 'Elevator', 'Security', 'Parking'],
      rating: 4.8
    },
    {
      id: 4,
      title: 'Family Compound',
      location: 'Al Olaya, Riyadh',
      price: '3,800,000',
      currency: 'SAR',
      type: 'For Sale',
      bedrooms: 8,
      bathrooms: 6,
      area: 650,
      image: 'https://www.omranarch.com/storage/projects/2014/1442-muhaidib-family-compound/2.jpg',
      features: ['Multiple Units', 'Private Garden', 'Guest House', 'Security'],
      rating: 4.9
    }
  ]

  return (
    <section className={styles.featured}>
      <div className={styles.featured__container}>
        {/* Section Header */}
        <div className={styles.featured__header}>
          <div className={styles.featured__subtitle}>
            Discover Excellence
          </div>
          <h2 className={styles.featured__title}>
            Featured Properties
          </h2>
          <p className={styles.featured__description}>
            Discover our handpicked selection of premium properties that offer the perfect blend of luxury, comfort, and investment potential.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.featured__filters}>
          <button className={`${styles.featured__filter} ${styles.active}`}>All</button>
          <button className={styles.featured__filter}>For Sale</button>
          <button className={styles.featured__filter}>For Rent</button>
          <button className={styles.featured__filter}>New Projects</button>
        </div>

        {/* Properties Grid */}
        <div className={styles.featured__grid}>
          {properties.map((property) => (
            <div 
              key={property.id}
              className={styles.featured__card}
            >
              {/* Image */}
              <div className={styles["featured__card-image"]}>
                <img 
                  src={property.image} 
                  alt={property.title} 
                />
                
                {/* Status Badge */}
                <div className={styles["featured__card-tag"]}>
                  {property.type}
                </div>

                {/* Favorite Button */}
                <button className={styles["featured__card-favorite"]}>
                  <Heart size={16} />
                </button>
              </div>

              {/* Content */}
              <div className={styles["featured__card-content"]}>
                {/* Price */}
                <div className={styles["featured__card-price"]}>
                  {property.price} {property.currency}
                  {property.type === 'For Rent' && <span> /month</span>}
                </div>

                {/* Title */}
                <h3 className={styles["featured__card-title"]}>
                  {property.title}
                </h3>

                {/* Location */}
                <div className={styles["featured__card-location"]}>
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>

                {/* Property Details */}
                <div className={styles["featured__card-features"]}>
                  {property.bedrooms > 0 && (
                    <div className={styles["featured__card-feature"]}>
                      <Bed size={16} />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                  )}
                  <div className={styles["featured__card-feature"]}>
                    <Bath size={16} />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className={styles["featured__card-feature"]}>
                    <Square size={16} />
                    <span>{property.area}m²</span>
                  </div>
                </div>
                
                <Link 
                  to={`/properties/${property.id}`}
                  className={styles["featured__card-btn"]}
                >
                  <Eye size={16} />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={styles["featured__more"]}>
          <button className={styles["featured__more-btn"]}>
            View All Properties
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties

