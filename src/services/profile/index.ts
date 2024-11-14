import { axiosClient } from "@/config/axiosClient"
import { IProfileResponse } from "@/types"

export const getProfileById = async (id: string) => {
    const response = await axiosClient.get<IProfileResponse>(`/business/${id}`)
    return response.data
}