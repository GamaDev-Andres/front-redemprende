'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { IProfileResponse } from '@/types'
import ToogleRecomendation from './ToogleRecomendation'
import RatingSection from './RatingSection'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { FaStar, FaThumbsUp } from 'react-icons/fa'
import RatingsModal from '../RatingsModal'

interface ProfileProps {
  data: IProfileResponse | undefined
}

const ProfileInfo = (props: ProfileProps) => {
  const { data } = props
  const { data: session } = useSession()
  const { id } = useParams()
  const isSameUser = (session?.user?.id ?? 0) === Number(id)

  if (!data) {
    return (
      <p className='text-center text-gray-500'>
        No hay información disponible.
      </p>
    )
  }

  return (
    <Card className='max-w-sm mx-auto shadow-none border-none p-0'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>{data.name}</CardTitle>
        {/* Rating and Recommendations */}
        <div className='flex items-center space-x-4 mt-2'>
          {data.averageRating !== undefined && (
            <RatingsModal
              businessId={data.id}
              averageRating={data.averageRating}
            />
          )}
          {data.recommendations !== undefined && (
            <div className='flex items-center text-blue-500'>
              <FaThumbsUp className='mr-1' />
              <span className='text-sm font-medium'>
                {data.recommendations} recomendaciones
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Categorías */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Categorías</h2>
          <div className='flex flex-wrap gap-2'>
            {data.categories.map(category => (
              <Badge
                key={category.id}
                className='bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 dark:bg-slate-300'
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Descripción */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Descripción</h2>
          <p>{data.description}</p>
        </div>

        <Separator />

        {/* Ubicación */}
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Ubicación</h2>
          <p>
            {data.city}, {data.country}
          </p>
          {data.address && <p>{data.address}</p>}
        </div>

        {/* Sitio Web */}
        {data.website && (
          <>
            <Separator />
            <div className='space-y-2'>
              <h2 className='text-lg font-semibold'>Sitio Web</h2>
              <a
                href={data.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                {data.website}
              </a>
            </div>
          </>
        )}

        {/* Correo Corporativo */}
        {data.corporateEmail && (
          <>
            <Separator />
            <div className='space-y-2'>
              <h2 className='text-lg font-semibold'>Correo Corporativo</h2>
              <p>{data.corporateEmail}</p>
            </div>
          </>
        )}

        {/* NIT */}
        {data.nit && (
          <>
            <Separator />
            <div className='space-y-2'>
              <h2 className='text-lg font-semibold'>NIT</h2>
              <p>{data.nit}</p>
            </div>
          </>
        )}

        {!isSameUser && (
          <>
            {/* Calificación */}
            <Separator />
            <RatingSection />

            {/* Recomendación */}
            <Separator />
            <div className='space-y-2'>
              <h2 className='text-lg font-semibold'>
                Recomendar este emprendimiento
              </h2>
              <ToogleRecomendation />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ProfileInfo
