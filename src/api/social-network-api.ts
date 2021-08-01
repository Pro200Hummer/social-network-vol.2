import axios from 'axios'
import {UserType} from "../features/Users/users-reducer";

/* Instance with query settings */
export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers:{
        'API-key': 'c3ff16a4-4b9d-490a-b188-2440deac59e8'
    }
});

/* Objects with requests to the server */
export const authApi = {
    me(){
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
    },
    login(requestParams: LoginRequestType){
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, requestParams)
    },
    logout(){
      return instance.delete<ResponseType>(`auth/login`)
    }
};

export const followingApi = {
    follow(userId: number){
        return instance.post<ResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number){
        return instance.delete<ResponseType>(`follow/${userId}`)
    },
    followingUsers(userId: number){
        return instance.get<ResponseType>(`follow/${userId}`)
    }
}

export const usersApi = {
    getUsers(currentPage: number = 1, pageSize: number = 50){
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    }
}


/* Types */
export type UsersResponseType = {
    items:UserType[]
    totalCount: number
    error: null | string
}

export type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export type LoginRequestType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

