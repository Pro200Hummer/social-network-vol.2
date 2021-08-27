import {AppThunkType} from "../../app/store";
import {followingApi, usersApi} from "../../api/social-network-api";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/app-utils";
import {setStatus} from "../../app/app-reducer";

export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export type UsersInitialStateType = {
    items: UserType[]
    totalCount: number
    pageSize: number
    currentPage: number
    followingProgress: number[]
    error: string | null
}

export type UsersReducerActionTypes =
    | ReturnType<typeof getUsers>
    | ReturnType<typeof changeCurrentPage>
    | ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof toggleFollowing>



const InitialState: UsersInitialStateType = {
    items: [],
    totalCount: 0,
    pageSize: 100,
    currentPage: 1,
    followingProgress: [],
    error: null

}

export const getUsers = (users: UserType[], totalCount: number, error: string | null) => ({
    type: "USERS/SET_USERS",
    users,
    totalCount,
    error
} as const)
export const changeCurrentPage = (currentPage: number) => ({type: "USERS/CHANGE_CURRENT_PAGE", currentPage} as const)
export const follow = (userID: number) => ({type: "USERS/FOLLOW", userID} as const)
export const unfollow = (userID: number) => ({type: "USERS/UNFOLLOW", userID} as const)
export const toggleFollowing = (isFollowing: boolean, userID: number) =>
    ({type: "USERS/TOGGLE_FOLLOWING",isFollowing, userID} as const)

export const usersReducer = (state = InitialState, action: UsersReducerActionTypes) => {
    switch (action.type) {
        case "USERS/SET_USERS":
            return {
                ...state,
                items: action.users,
                totalCount: action.totalCount,
                error: action.error
            }
        case "USERS/CHANGE_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "USERS/FOLLOW":
            return {
                ...state,
                items: state.items.map(u => {
                    if(u.id === action.userID){
                        return {...u, followed: !u.followed}
                    }else{
                        return u
                    }
                })
            }
        case "USERS/UNFOLLOW":
            return {
                ...state,
                items: state.items.map(u => {
                    if(u.id === action.userID){
                        return {...u, followed: !u.followed}
                    }else{
                        return u
                    }
                })
            }
        case "USERS/TOGGLE_FOLLOWING":
            return {
                ...state,
                followingProgress: action.isFollowing ?
                    [...state.followingProgress, action.userID ]:
                    state.followingProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
};

export const getUsersTC = (currentPage: number, pageSize: number):AppThunkType => dispatch => {
    dispatch(setStatus("loading"))
    usersApi.getUsers(currentPage, pageSize)
        .then(res => {
            dispatch(getUsers(res.data.items, res.data.totalCount, res.data.error))
            dispatch(setStatus("succeed"))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}

export const followTC = (userID: number):AppThunkType => dispatch => {
    dispatch(setStatus("loading"))
    dispatch(toggleFollowing(true, userID))
    followingApi.unfollow(userID)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(unfollow(userID))
                dispatch(setStatus("succeed"))
            }else{
                handlerServerAppError(res.data, dispatch)
            }
            dispatch(toggleFollowing(false, userID))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}

export const unfollowTC = (userID: number):AppThunkType => dispatch => {
    dispatch(setStatus("loading"))
    dispatch(toggleFollowing(true, userID))
    followingApi.follow(userID)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(follow(userID))
                dispatch(setStatus("succeed"))
            }else{
                handlerServerAppError(res.data, dispatch)
            }
            dispatch(toggleFollowing(false, userID))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}

