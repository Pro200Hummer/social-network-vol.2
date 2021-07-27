import {AppThunkType} from "../../app/store";
import {usersApi} from "../../api/social-network-api";

export const usersInitialState: UsersReducerInitialStateType = {
    users: [],
    totalUsersCount: null,
    error: null

}

export const usersReducer = (state = usersInitialState, action: UsersReducerActionType):
    UsersReducerInitialStateType => {
    switch (action.type) {
        case "SET_USERS":
            return {...state,
                users: action.users,
                totalUsersCount: action.totalCount,
                error: action.error
            }
        default:
            return state
    }
}

/* Actions */
export const setUsersAC = (users: UserType[], totalCount: number, error: string | null) => ({
    type: "SET_USERS",
    users,
    totalCount,
    error
} as const)

/* Thunks */
export const setUsersTC = (): AppThunkType => async dispatch => {
    try {
        const res = await usersApi.getUsers()
        dispatch(setUsersAC(res.data.items, res.data.totalCount, res.data.error))
    } catch (error) {

    }
}


/* Types */
export type UsersReducerInitialStateType = {
    users: UserType[]
    totalUsersCount: number | null
    error: string | null
}
export type UserType = {
    id: number
    name: number
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export type UsersReducerActionType =
    ReturnType<typeof setUsersAC>

