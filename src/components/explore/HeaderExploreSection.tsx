'use client'
import React from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MultiSelect } from '../ui/multi-select'
import { useGetCategoriesQuery } from '@/queries/category'

interface HeaderExploreSectionProps {
  categories: string[]
}

interface FormInputs {
  searchQuery: string
  selectedCategories: string[]
}

const HeaderExploreSection = () => {
  const { register, handleSubmit, setValue, getValues, watch, control } =
    useForm<FormInputs>({
      defaultValues: {
        searchQuery: '',
        selectedCategories: []
      }
    })
  const { data: categories = [] } = useGetCategoriesQuery()

  const handleCategoryToggle = (category: string) => {
    const currentCategories = watch('selectedCategories')
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(item => item !== category)
      : [...currentCategories, category]

    setValue('selectedCategories', updatedCategories)
  }
  const currentCategories = getValues('selectedCategories')
  console.log({ currentCategories });
  
  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log({ data })
  }

  return (
    <Card className='w-auto p-6 m-4'>
      <CardContent>
        <div className='mb-4 text-center'>
          <h2 className='text-3xl font-semibold mb-2'>Explorar</h2>
          <p>
            Encuentra los mejores lugares para disfrutar. Puedes buscar
            restaurantes, cafeterías, tiendas y mucho más.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col md:flex-row items-center gap-4 mb-4'
        >
          <Input
            type='text'
            placeholder='¿Qué estás buscando?'
            {...register('searchQuery')}
            className='flex-grow'
          />
          <Button type='submit' className='w-full md:w-auto'>
            Buscar
          </Button>
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
