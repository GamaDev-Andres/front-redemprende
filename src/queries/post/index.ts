import { QUERY_KEYS } from '@/constants/queryKeys'
import { getAllPosts } from '@/services/post'
import { useQuery } from '@tanstack/react-query'

export const useGetAllPostsQuery = (userId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST.GETALL, userId],
    queryFn: async () => {
      return await getAllPosts(userId)
    }
  })
}
