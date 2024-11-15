'use client'
import React, { useState } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { useCreateOrUpdateRecommendation } from '@/mutations/recommendation/indexe'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useGetProfileByIdQuery } from '@/queries/profile'

const ToogleRecomendation = () => {
  const [isRecommended, setIsRecommended] = useState(false)
  const { mutateAsync } = useCreateOrUpdateRecommendation()
  const { data: session } = useSession()
  const { id } = useParams()
  const { data } = useGetProfileByIdQuery(id.toString() ?? '')

  const handleOnPressed = async (state: boolean) => {
    setIsRecommended(state)
    await mutateAsync({
      recommended: state,
      userId: session?.user?.id ?? 0,
      businessId: data?.id ?? 0
    })
  }
  return (
    <Toggle
      pressed={isRecommended}
      onPressedChange={handleOnPressed}
      className={`${
        isRecommended ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      } px-4 py-2 rounded-md`}
    >
      {isRecommended ? 'Recomendado' : 'Recomendar'}
    </Toggle>
  )
}

export default ToogleRecomendation
