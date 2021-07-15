import axios from 'axios'

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

/*export const usersApi = {
    getUsers(count: number, page: number){
        return instance.get(`users`)
    }
}*/


/* Types */
export type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export type LoginRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

