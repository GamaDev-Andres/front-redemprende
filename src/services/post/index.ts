import { axiosClient } from '@/config/axiosClient'
import { IPostRequest, IPostResponse } from '@/types'

export const createPost = async (post: IPostRequest) => {
  const response = await axiosClient.post<IPostResponse>('/post', post)
  return response.data
}


export const getAllPosts = async (userId: number) => {
    const response = await axiosClient.get<IPostResponse[]>(`/post/user/${userId}`)
    return response.data
  }
  