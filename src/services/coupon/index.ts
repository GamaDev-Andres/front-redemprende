import { axiosClient } from '@/config/axiosClient'
import { ICouponFormData, ICouponResponse } from '@/types'

export const createCoupon = async ({
  data,
  businessId
}: {
  data: ICouponFormData
  businessId: number
}) => {
  const response = await axiosClient.post<ICouponResponse>(
    `/coupons/${businessId}`,
    data
  )
  return response.data
}
export const getCoupons = async (businessId: number) => {
  const response = await axiosClient.get<ICouponResponse[]>(
    `/coupons/${businessId}`
  )
  return response.data
}
