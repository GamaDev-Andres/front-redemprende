'use client'
import HeaderExploreSection from '@/components/explore/HeaderExploreSection'
import ProfileCard from '@/components/profile/ProfileCard'
import { useGetProfilesQuery } from '@/queries/profile'
import React, { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
export interface ISearchFormInputs {
  searchQuery: string
  selectedCategories: string[]
}
const Explore = () => {
  const { data } = useGetProfilesQuery()
  const methods = useForm<ISearchFormInputs>({
    defaultValues: {
      searchQuery: '',
      selectedCategories: []
    }
  })
  const { watch } = methods
  const dataFiltered = useMemo(() => {
    let queryData = data

    if (watch('selectedCategories').length === 0 && !watch('searchQuery'))
      return data
    if (queryData  && data) {
      if(watch('selectedCategories').length > 0) {
        
        queryData = data.filter(profile =>
          profile.categories.some(category =>
            watch('selectedCategories').includes(category.id.toString())
          )
        )
      }
      if (watch('searchQuery')) {
        queryData = queryData.filter(profile =>
          profile.name
            .toLowerCase()
            .includes(watch('searchQuery').toLowerCase())
        )
      }
    }

    return queryData
  }, [data, watch('selectedCategories'), watch('searchQuery')])
  return (
    <FormProvider {...methods}>
      <main className='dark:bg-slate-900 py-2'>
        <HeaderExploreSection />
        <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {(dataFiltered ?? []).map(post => (
            <ProfileCard {...post} key={post.id} />
          ))}
        </div>
      </main>
    </FormProvider>
  )
}

export default Explore
