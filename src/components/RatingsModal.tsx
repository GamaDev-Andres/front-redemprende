'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { FaStar } from 'react-icons/fa'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useGetRatingsQuery } from '@/queries/rating'

interface RatingsModalProps {
  averageRating: number
  businessId: number
}

const RatingsModal: React.FC<RatingsModalProps> = ({
  averageRating,
  businessId
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: ratings, isLoading,refetch } = useGetRatingsQuery(
    isDialogOpen ? businessId : 0
  )
  useEffect(() => {
      refetch()
  },[isDialogOpen])
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className='flex items-center text-yellow-500 cursor-pointer'>
          <FaStar className='mr-1' />
          <span className='text-sm font-medium'>
            {averageRating.toFixed(1)} / 5
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className='max-w-lg'>
        <DialogHeader>
          <DialogTitle>Calificaciones</DialogTitle>
          <DialogClose />
        </DialogHeader>
        {isLoading ? (
          <p className='text-center'>Cargando...</p>
        ) : (
          <div className='space-y-4'>
            {(ratings ?? []).map(rating => (
              <div key={rating.id} className='flex items-start space-x-4'>
                <Avatar>
                  <AvatarImage
                    src={rating.user.imageUrl}
                    alt={rating.user.name}
                  />
                  <AvatarFallback>{rating.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className='font-medium'>{rating.user.name}</p>
                  <p className='text-sm text-gray-500'>{rating.comment}</p>
                  <p className='text-sm text-yellow-500'>
                    {rating.rating} / 5 <FaStar className='inline-block' />
                  </p>
                </div>
              </div>
            ))}
            {(ratings ?? []).length === 0 && (
              <p className='text-center text-gray-500'>
                No hay calificaciones disponibles.
              </p>
            )}
          </div>
        )}
        <Separator className='my-4' />
      </DialogContent>
    </Dialog>
  )
}

export default RatingsModal
