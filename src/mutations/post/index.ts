import { MUTATION_KEYS } from '@/constants/mutationKeys'
import { QUERY_KEYS } from '@/constants/queryKeys'
import { createPost } from '@/services/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {toast} from 'sonner'

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient() 
  
    return useMutation({
      mutationKey: [MUTATION_KEYS.POST.CREATE],
      mutationFn: createPost,
      onSuccess: () => {
        toast.success('Post creado exitosamente')
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.POST.GETALL],
          exact: false 
        })
      }
    })
  }