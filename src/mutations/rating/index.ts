import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { createOrUpdateRating } from '@/services/rating'
import { useMutation } from '@tanstack/react-query'

export const useCreateOrUpdateRating = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.RATING.CREATE],
    mutationFn: createOrUpdateRating
  })
}
