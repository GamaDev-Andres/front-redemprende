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



export default function BusinessForm () {
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<IBusinessForm>()
  const { mutateAsync } = useCreateBusinessMutation()
  const {data: categories} =useGetCategoriesQuery()
  const { data: session } = useSession()
  const { toast } = useToast()
  console.log({ session });
  
  const onSubmit = async (data: IBusinessForm) => {
    console.log('Datos del negocio:', data)
    const body: BusinessRequestDTO = {
      ...data,
      userEmail: session?.user?.email ?? ''
    }
    const res = await mutateAsync(body)

    if(res.id){
      toast({
        variant: "default",
        title: "Negocio creado",
        description: "El negocio ha sido creado exitosamente.",
      })
    }
    reset()
    setValue('categories', [])

    // Aquí puedes hacer el POST al backend utilizando fetch o axios
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
              options={(categories?.map(c => ({ label: c.name, value: c.id?.toString(),icon:undefined})) ?? [])}
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

      <Button type='submit' variant='default' className='w-full'>
        Registrar Negocio
      </Button>
    </form>
  )
}
