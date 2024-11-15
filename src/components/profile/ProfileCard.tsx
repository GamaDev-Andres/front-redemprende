// components/ProfileCard.tsx
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { FaGlobe, FaThumbsUp } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { IBusinessResponse } from '@/types'
import RatingsModal from '../RatingsModal'

const ProfileCard: React.FC<IBusinessResponse> = ({
  name,
  categories,
  description,
  website,
  city,
  corporateEmail,
  country,
  address,
  userId,
  averageRating,
  recommendations,
  id
}) => {
  return (
    <Card className='max-w-md shadow-md border border-gray-300 rounded-lg transform transition hover:scale-105'>
      <CardHeader>
        <Link href={`/profile/${userId}`} passHref>
          <CardTitle className='text-xl font-semibold text-gray-800 dark:text-white cursor-pointer hover:underline'>
            {name}
          </CardTitle>
        </Link>
        <CardDescription className='text-sm'>
          {city}, {country}
        </CardDescription>
        {/* Rating and Recommendations Section */}
        <div className='flex items-center mt-2 space-x-4'>
          {averageRating !== undefined && (
            <RatingsModal businessId={id} averageRating={averageRating} />
          )}
          {recommendations !== undefined && (
            <div className='flex items-center text-blue-500'>
              <FaThumbsUp className='mr-1' />
              <span className='text-sm font-medium'>
                {recommendations} recomendaciones
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm mb-4'>{description}</p>
        {address && (
          <div className='mb-4'>
            <p className='text-sm font-medium text-gray-600 dark:text-white'>
              Dirección:
            </p>
            <p className='text-sm'>{address}</p>
          </div>
        )}
        <div className='mb-4'>
          <p className='text-sm font-medium text-gray-600 my-2 dark:text-white'>
            Categorias:
          </p>
          <div className='flex flex-wrap gap-2'>
            {categories.map((category, index) => (
              <Badge key={index} variant='outline' className='text-sm'>
                {category.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className='flex items-center justify-between mt-4'>
          {website && (
            <a
              href={website}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm border text-blue-500 dark:text-blue-400 border-gray-300 rounded-md px-4 py-2 flex items-center hover:bg-gray-100'
            >
              <FaGlobe className='mr-2' /> Sitio Web
            </a>
          )}
          {corporateEmail && (
            <a
              href={`mailto:${corporateEmail}`}
              className='text-sm rounded-md px-4 py-2 flex items-center'
            >
              Contacto
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
