'use client'

import { useForm, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '../ui/multi-select'
import { IBusinessForm, BusinessRequestDTO } from '@/types'
import { useCreateBusinessMutation } from '@/mutations/business'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useGetCategoriesQuery } from '@/queries/category'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const defaultIcon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;
export default function BusinessForm () {
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<IBusinessForm>()
  const { mutateAsync } = useCreateBusinessMutation()
  const { data: categories } = useGetCategoriesQuery()
  const { data: session } = useSession()
  const { toast } = useToast()

  const onSubmit = async (data: IBusinessForm) => {
    const body: BusinessRequestDTO = {
      ...data,
      userEmail: session?.user?.email ?? ''
    }
    const res = await mutateAsync(body)

    if (res.id) {
      toast({
        variant: 'default',
        title: 'Negocio creado',
        description: 'El negocio ha sido creado exitosamente.'
      })
    }
    reset()
    setValue('categories', [])
  }

  const LocationSelector = ({
    onSelectLocation
  }: {
    onSelectLocation: (coords: [number, number]) => void
  }) => {
    useMapEvents({
      click (e) {
        onSelectLocation([e.latlng.lat, e.latlng.lng])
      }
    })
    return null
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 max-w-lg mx-auto p-8 bg-white dark:bg-slate-900 my-8 rounded-md shadow-md'
    >
      <h1 className='text-2xl font-bold text-center mb-4'>Registrar Negocio</h1>

      <div>
        <Label htmlFor='corporateEmail'>Correo Corporativo</Label>
        <Input
          id='corporateEmail'
          placeholder='ejemplo@miempresa.com'
          {...register('corporateEmail', {
            required: 'El correo corporativo es obligatorio.',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Debe ser un correo electrónico válido.'
            }
          })}
        />
        {errors.corporateEmail && (
          <p className='text-red-500 text-sm'>
            {errors.corporateEmail.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor='name'>Nombre del Negocio</Label>
        <Input
          id='name'
          placeholder='Ej. Mi Empresa'
          {...register('name', {
            required: 'El nombre del negocio es obligatorio.'
          })}
        />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>Categorías</Label>
        <Controller
          name='categories'
          control={control}
          render={({ field }) => (
            <MultiSelect
              options={
                categories?.map(c => ({
                  label: c.name,
                  value: c.id?.toString(),
                  icon: undefined
                })) ?? []
              }
              placeholder='Selecciona una o más categorías'
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        {errors.categories && (
          <p className='text-red-500 text-sm'>
            Selecciona al menos una categoría.
          </p>
        )}
      </div>

      <div>
        <Label htmlFor='description'>Descripción</Label>
        <Textarea
          id='description'
          placeholder='Describe tu negocio brevemente'
          {...register('description', {
            required: 'La descripción es obligatoria.'
          })}
        />
        {errors.description && (
          <p className='text-red-500 text-sm'>{errors.description.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='country'>País</Label>
        <Input
          id='country'
          placeholder='Ej. Colombia'
          {...register('country', { required: 'El país es obligatorio.' })}
        />
        {errors.country && (
          <p className='text-red-500 text-sm'>{errors.country.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='city'>Ciudad</Label>
        <Input
          id='city'
          placeholder='Ej. Bogotá'
          {...register('city', { required: 'La ciudad es obligatoria.' })}
        />
        {errors.city && (
          <p className='text-red-500 text-sm'>{errors.city.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='website'>Sitio Web (opcional)</Label>
        <Input
          id='website'
          placeholder='https://miempresa.com'
          {...register('website', {
            pattern: {
              value: /^https?:\/\/.*\..*$/,
              message: 'Debe ser una URL válida.'
            }
          })}
        />
        {errors.website && (
          <p className='text-red-500 text-sm'>{errors.website.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='nit'>NIT (opcional)</Label>
        <Input id='nit' placeholder='Ej. 123456789-0' {...register('nit')} />
      </div>

      <div>
        <Label htmlFor='address'>Dirección (opcional)</Label>
        <Input
          id='address'
          placeholder='Ej. Calle 123 #45-67'
          {...register('address')}
        />
      </div>

      <div>
        <Label htmlFor='latitude'>Latitud</Label>
        <Input
          id='latitude'
          placeholder='Ej. 4.710989'
          {...register('latitude', {
            required: 'La latitud es obligatoria.',
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: 'Debe ser una latitud válida.'
            }
          })}
        />
        {errors.latitude && (
          <p className='text-red-500 text-sm'>{errors.latitude.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor='longitude'>Longitud</Label>
        <Input
          id='longitude'
          placeholder='Ej. -74.072092'
          {...register('longitude', {
            required: 'La longitud es obligatoria.',
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: 'Debe ser una longitud válida.'
            }
          })}
        />
        {errors.longitude && (
          <p className='text-red-500 text-sm'>{errors.longitude.message}</p>
        )}
      </div>

      <div>
        <MapContainer
          center={[4.710989, -74.072092]} // Coordenadas iniciales
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          <LocationSelector
            onSelectLocation={coords => {
              setValue('latitude', coords[0])
              setValue('longitude', coords[1])
            }}
          />
          {watch('latitude') && watch('longitude') && (
            <Marker position={[watch('latitude'), watch('longitude')]} />
          )}
        </MapContainer>
      </div>

      <Button type='submit' variant='default' className='w-full'>
        Registrar Negocio
      </Button>
    </form>
  )
}
