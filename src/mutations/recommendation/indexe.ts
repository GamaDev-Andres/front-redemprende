import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { createOrUpdateRecommendation } from '@/services/recommendation'
import { useMutation } from '@tanstack/react-query'

export const useCreateOrUpdateRecommendation = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.RECOMMENDATION.CREATE],
    mutationFn: createOrUpdateRecommendation
  })
}
