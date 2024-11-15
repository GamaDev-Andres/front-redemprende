import { QUERY_KEYS } from '@/constants/queryKeys'
import { getBusinesses } from '@/services/business'
import { getProfileById } from '@/services/profile'
import { useQuery } from '@tanstack/react-query'

export function useGetProfileByIdQuery (id: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE.GETBYID, id],
    retry: 0,
    queryFn: async () => {
      if (!id) return
      return await getProfileById(id)
    }
  })
}
export function useGetProfilesQuery () {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE.GETALL],
    queryFn: async () => {
      return await getBusinesses()
    }
  })
}
