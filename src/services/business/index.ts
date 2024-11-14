import { axiosClient } from '@/config/axiosClient'
import { BusinessRequestDTO, IBusinessResponse } from '@/types'

export const createBusiness = async (business: BusinessRequestDTO) => {
  const response = await axiosClient.post<IBusinessResponse>('/business', business)
  return response.data
}
export const getBusinesses = async () => {
  const response = await axiosClient.get<IBusinessResponse[]>('/business')
  return response.data
}
