// components/ProfileCard.tsx
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { FaGlobe, FaFacebook } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

interface ProfileProps {
  businessName: string
  categories: string[]
  description: string
  location: string
  website?: string
  socialMedia?: string
}

const ProfileCard: React.FC<ProfileProps> = ({
  businessName,
  categories,
  description,
  location,
  website,
  socialMedia
}) => {
  return (
    <Card className='max-w-md w-full p-4 shadow-md rounded-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>{businessName}</CardTitle>
        <CardDescription className='mt-1'>
          {location}
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4'>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category, index) => (
            <Badge key={index} className='bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100'>
              {category}
            </Badge>
          ))}
        </div>

        <p className='text-sm'>{description}</p>

        {website && (
          <Button
            variant='link'
            className='text-blue-600 dark:text-blue-400 hover:underline mt-4'
            asChild
          >
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <FaGlobe className='inline-block mr-2' /> Sitio Web
            </a>
          </Button>
        )}

        {socialMedia && (
          <Button
            variant='link'
            className='text-blue-600 dark:text-blue-400 hover:underline'
            asChild
          >
            <a href={socialMedia} target='_blank' rel='noopener noreferrer'>
              <FaFacebook className='inline-block mr-2' /> Redes Sociales
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ProfileCard
