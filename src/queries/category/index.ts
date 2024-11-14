import { QUERY_KEYS } from '@/constants/queryKeys'
import { getCategories } from '@/services/category'
import { useQuery } from '@tanstack/react-query'

export function useGetCategoriesQuery () {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORY.GETALL],
    queryFn: async () => {
      return await getCategories()
    }
  })
}
