import { QUERY_KEYS } from '@/constants/queryKeys'
import { getCoupons } from '@/services/coupon'
import { useQuery } from '@tanstack/react-query'

export function useGetCouponsQuery (businessId: number) {
  return useQuery({
    queryKey: [QUERY_KEYS.COUPON.GET, businessId],
    queryFn: async () => {
      return await getCoupons(businessId)
    }
  })
}
