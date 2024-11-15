import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { useCreateOrUpdateRating } from '@/mutations/rating'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useGetProfileByIdQuery } from '@/queries/profile'
import { useGetRatingQuery } from '@/queries/rating'

interface RatingFormInputs {
  comment: string
  rating: number
}

const RatingSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { data: session } = useSession()
  const { id } = useParams()
  const { data: businessData } = useGetProfileByIdQuery(id.toString() ?? '')
  const { data: ratingData } = useGetRatingQuery(
    session?.user?.id ?? 0,
    businessData?.id ?? 0
  )
  const { mutateAsync } = useCreateOrUpdateRating()
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<RatingFormInputs>()

  useEffect(() => {
    reset({
      comment: ratingData?.comment ?? '',
      rating: ratingData?.rating ?? 0
    })
  }, [ratingData])
  const handleRating = (newRating: number) => {
    setIsDialogOpen(true)
    setValue('rating', newRating)
  }

  const onSubmit = async (data: RatingFormInputs) => {
    await mutateAsync({
      userId: session?.user?.id ?? 0,
      businessId: businessData?.id ?? 0,
      rating: data.rating,
      comment: data.comment
    })
    setIsDialogOpen(false)
  }

  return (
    <div className='space-y-2'>
      <h2 className='text-lg font-semibold'>Calificación</h2>
      <div className='flex items-center gap-1'>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleRating(index + 1)}
            className={`${
              watch('rating') > index ? 'text-yellow-500' : 'text-gray-400'
            } hover:text-yellow-400 transition`}
          >
            <Star size={20} />
          </button>
        ))}
      </div>
      <p className='text-sm text-gray-500'>
        Calificación: {watch('rating')} de 5
      </p>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar un comentario</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Textarea
              placeholder='Escribe tu comentario aquí...'
              {...register('comment', {
                required: 'El comentario es obligatorio'
              })}
            />
            <div className='flex justify-end gap-2'>
              <Button
                variant='secondary'
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type='submit'>Enviar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RatingSection
