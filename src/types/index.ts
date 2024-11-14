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
  categories: string[]
}
export interface ICategoryResponse {
  id: number
  name: string
}
export interface IProfileResponse {
  corporateEmail: string
  name: string
  address?: string
  country: string
  city: string
  description: string
  website?: string
  nit?: string
  categories: ICategoryResponse[]
  id: number
}
