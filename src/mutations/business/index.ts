import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { createBusiness } from '@/services/business'
import { useMutation } from '@tanstack/react-query'

export const useCreateBusinessMutation = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.BUSINESS.CREATE],
    mutationFn: createBusiness
  })
}
