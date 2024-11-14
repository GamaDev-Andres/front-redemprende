import { axiosClient } from "@/config/axiosClient";
import { IUserRequest, IUserResponse } from "@/types";
export const signInApi = async (user: IUserRequest) => {
    const response = await axiosClient.post<IUserResponse>("/user", user);
    return response.data;
};