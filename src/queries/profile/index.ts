import { QUERY_KEYS } from '@/constants/queryKeys'
import { getProfileById } from '@/services/profile'
import { useQuery } from '@tanstack/react-query'

export function useGetProfileByIdQuery (id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE.GETBYID, id],
    queryFn: async () => {
      if (!id) return
      return await getProfileById(id)
    }
  })
}
