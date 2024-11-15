import { axiosClient } from '@/config/axiosClient'
import { IRatingRequest, IRatingResponse } from '@/types'

export const createOrUpdateRating = async (rating: IRatingRequest) => {
  const response = await axiosClient.post<null>(`/rating`, rating)
  return response.data
}
export const getRating = async (userId: number, businessId: number) => {
  const response = await axiosClient.get<IRatingResponse>(
    `/rating/business/${businessId}/user/${userId}`
  )
  return response.data
}
export const getRatingsByBusinessId = async (businessId: number) => {
    const response = await axiosClient.get<IRatingResponse[]>(
      `/rating/business/${businessId}`
    )
    return response.data
  }
  