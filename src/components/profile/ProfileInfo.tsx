'use client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Toggle } from '@/components/ui/toggle'
import { IProfileResponse } from '@/types'
import { useState } from 'react'
import { Star } from 'lucide-react'

interface ProfileProps {
  data: IProfileResponse | undefined
}

const ProfileInfo = (props: ProfileProps) => {
  const { data } = props
  const [isRecommended, setIsRecommended] = useState(false)
  const [rating, setRating] = useState(0)

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

        {/* Calificación */}
        <Separator />
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Calificación</h2>
          <div className='flex items-center gap-1'>
            {Array.from({ length: 5 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className={`${
                  rating > index ? 'text-yellow-500' : 'text-gray-400'
                } hover:text-yellow-400 transition`}
              >
                <Star size={20} />
              </button>
            ))}
          </div>
          <p className='text-sm text-gray-500'>Calificación: {rating} de 5</p>
        </div>

        {/* Recomendación */}
        <Separator />
        <div className='space-y-2'>
          <h2 className='text-lg font-semibold'>Recomendar este emprendimiento</h2>

          <Toggle
            pressed={isRecommended}
            onPressedChange={state => setIsRecommended(state)}
            className={`${
              isRecommended
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } px-4 py-2 rounded-md`}
          >
            {isRecommended ? 'Recomendado' : 'Recomendar'}
          </Toggle>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileInfo
