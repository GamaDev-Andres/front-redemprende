import { axiosClient } from "@/config/axiosClient"
import { ICategoryResponse } from "@/types"

export const getCategories = async () => {
    const response = await axiosClient.get<ICategoryResponse[]>('/category')
    return response.data
}