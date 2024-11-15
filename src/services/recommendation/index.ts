import { axiosClient } from '@/config/axiosClient'
import { IRecommendationRequest, IRecommendationResponse } from '@/types'

export const createOrUpdateRecommendation = async (
  recommendation: IRecommendationRequest
) => {
  const response = await axiosClient.post<null>(
    `/recommendation`,
    recommendation
  )
  return response.data
}
export const getRecommendation = async (userId: number, businessId: number) => {
  const response = await axiosClient.get<IRecommendationResponse>(
    `/recommendation/business/${businessId}/user/${userId}`
  )
  return response.data
}
