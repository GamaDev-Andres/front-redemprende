import { QUERY_KEYS } from '@/constants/queryKeys'
import { getRecommendation } from '@/services/recommendation'
import { useQuery } from '@tanstack/react-query'

export function useGetRecommendationQuery (userId: number, businessId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.RECOMMENDATION.GET, userId, businessId],
    queryFn: async () => {
      if (!userId || !businessId) return
      return await getRecommendation(userId, businessId)
    }
  })
}
