export interface IUserRequest {
  email: string
  name: string
  imageUrl: string
}
export interface IUserResponse {
  id: number
  email: string
  name: string
  imageUrl: string
}
export interface IBusinessForm {
  corporateEmail: string
  name: string
  address?: string
  country: string
  city: string
  description: string
  website?: string
  nit?: string
  categories: string[]
}
export interface BusinessRequestDTO extends IBusinessForm {
  userEmail: string
}
export interface IBusinessResponse {
  id: number
  corporateEmail: string
  name: string
  address?: string
  country: string
  city: string
  description: string
  website?: string
  nit?: string
  userId: number
  recommendations: number
  averageRating: number
  categories: ICategoryResponse[]
}
export interface ICategoryResponse {
  id: number
  name: string
}

export type IProfileResponse = IBusinessResponse
export interface IPostRequest{
  title: string
  description: string
  imageUrl: string
  userId:number
}
export interface IPostResponse{
  id: number
  title: string
  description: string
  imageUrl: string
}

export interface IRecommendationRequest{
  userId: number
  businessId: number
  recommended: boolean

}
export interface IRatingRequest{
  userId: number
  businessId: number
  rating: number
  comment?:string | null
}
export interface IRatingResponse{
  id: number
  user: IUserResponse
  business: Omit<IBusinessResponse, 'categories'>
  rating: number
  comment?:string | null
}
export interface IRecommendationResponse{
  id: number
  user: IUserResponse
  business: Omit<IBusinessResponse, 'categories'>
  recommended: number
}
