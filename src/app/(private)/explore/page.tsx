"use client"
import HeaderExploreSection from '@/components/explore/HeaderExploreSection'
import ProfileCard from '@/components/profile/ProfileCard'
import React from 'react'
const profileMock = {
  businessName: 'Mi Emprendimiento',
  categories: ['Tecnología', 'Alimentos', 'Moda'],
  description: 'Descripción del emprendimiento',
  location: 'Ciudad, Estado, País',
  website: 'https://miemprendimiento.com',
  socialMedia: '@miemprendimiento'
}

const categoriesMock = ['Tecnología', 'Alimentos', 'Moda', 'Salud', 'Belleza']
const Explore = () => {
  return (
    <main className='dark:bg-slate-900 py-2'>
      <HeaderExploreSection
        categories={categoriesMock}
      />
      <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {[1, 2, 3, 4, 5].map(post => (
          <ProfileCard {...profileMock} key={post} />
        ))}
      </div>
    </main>
  )
}

export default Explore
