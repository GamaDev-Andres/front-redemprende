import { QUERY_KEYS } from '@/constants/queryKeys'
import { getRating, getRatingsByBusinessId } from '@/services/rating'
import { useQuery } from '@tanstack/react-query'


export function useGetRatingQuery ( userId: number, businessId: number ) {
  return useQuery({
    queryKey: [QUERY_KEYS.RATING.GET, userId, businessId],
    queryFn: async () => {
      return await getRating(userId, businessId)
    }
  })
}
export function useGetRatingsQuery ( businessId: number ) {
    return useQuery({
      queryKey: [QUERY_KEYS.RATING.GET_ALL_BY_BUSINESS, businessId],
      queryFn: async () => {
        if (!businessId) return
        return await getRatingsByBusinessId(businessId)
      }
    })
  }
  