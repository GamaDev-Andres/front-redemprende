import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { createOrUpdateRating } from '@/services/rating'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateOrUpdateRating = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.RATING.CREATE],
    mutationFn: createOrUpdateRating,
    onSuccess: () => {
      toast.success('Calificación creada exitosamente')
    },
  })
}
