import { axiosClient } from "@/config/axiosClient"
import { IRecommendationRequest } from "@/types"

export const createOrUpdateRecommendation = async (recommendation : IRecommendationRequest) => {
    const response = await axiosClient.post<null>(`/recommendation`, recommendation)
    return response.data
}