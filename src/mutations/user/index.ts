import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { signInApi } from '@/services/signIn'
import { useMutation } from '@tanstack/react-query'

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.USER.SIGNIN],
    mutationFn: signInApi
  })
}
