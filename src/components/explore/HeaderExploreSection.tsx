'use client'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { MultiSelect } from '../ui/multi-select'
import { useGetCategoriesQuery } from '@/queries/category'
import { ISearchFormInputs } from '@/app/(private)/explore/page'

const HeaderExploreSection = () => {
  const { register, control } = useFormContext<ISearchFormInputs>()
  const { data: categories = [] } = useGetCategoriesQuery()

  return (
    <Card className='w-auto p-6 m-4'>
      <CardContent>
        <div className='mb-4 text-center'>
          <h2 className='text-3xl font-semibold mb-2'>Explorar</h2>
          <p>
            Encuentra los mejores emprendedores de Villavicencio. Puedes buscar
            por categorías o por nombre de emprendimiento.
          </p>
        </div>

        <form className='flex flex-col md:flex-row items-center gap-4 mb-4'>
          <Input
            type='text'
            placeholder='¿Qué estás buscando?'
            {...register('searchQuery')}
            className='flex-grow'
          />
        </form>

        <div className='flex flex-wrap gap-2 mt-2'>
          <Controller
            name='selectedCategories'
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
                className='max-w-lg'
                placeholder='Selecciona una o más categorías'
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default HeaderExploreSection
