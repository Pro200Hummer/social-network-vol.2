import {UserType} from "../../features/Users/users-reducer";

export const stateForUsersReducer: UsersStoriesInitialStateType = {
    items: [],
    totalCount: 0,
    pageSize: 100,
    currentPage: 1,
    followingProgress: [],
    error: null

}

export const usersStoriesReducer = (state = stateForUsersReducer, action: UsersStoriesActionTypes) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                items: action.users,
                totalCount: action.totalCount,
                error: action.error
            }
        case "CHANGE_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "FOLLOW":
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
        case "UNFOLLOW":
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
        case "TOGGLE_FOLLOWING":
            return {
                ...state,
                followingProgress: action.isFollowing ?
                    [...state.followingProgress, action.userID ]:
                    state.followingProgress.filter(id => id !== action.userID)
            }
        default:
            return state
    }
}

/* Action creators */
export const getUsersAC = (users: UserType[], totalCount: number, error: string | null) => ({
    type: "SET_USERS",
    users,
    totalCount,
    error
} as const)
export const changeCurrentPageAC = (currentPage: number) => ({type: "CHANGE_CURRENT_PAGE", currentPage} as const)
export const followAC = (userID: number) => ({type: "FOLLOW", userID} as const)
export const unfollowAC = (userID: number) => ({type: "UNFOLLOW", userID} as const)
export const toggleFollowingAC = (isFollowing: boolean, userID: number) =>
    ({type: "TOGGLE_FOLLOWING",isFollowing, userID} as const)

/* Types */
export type UsersStoriesInitialStateType = {
    items: UserType[]
    totalCount: number
    pageSize: number
    currentPage: number
    followingProgress: number[]
    error: string | null
}

type UsersStoriesActionTypes =
    | ReturnType<typeof getUsersAC>
    | ReturnType<typeof changeCurrentPageAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof toggleFollowingAC>
