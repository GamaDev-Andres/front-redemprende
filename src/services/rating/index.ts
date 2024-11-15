import { axiosClient } from "@/config/axiosClient"
import { IRatingRequest } from "@/types"

export const createOrUpdateRating = async (rating : IRatingRequest) => {
    const response = await axiosClient.post<null>(`/rating`, rating)
    return response.data
}