export const stateForUsersStories: UsersStoriesInitialStateType = {
    items: [],
    totalCount: null,
    pageSize: 50,
    error: null

}

export const usersStoriesReducer = (state:UsersStoriesInitialStateType, action: UsersStoriesActionTypes) => {
    switch (action.type){
        case "SET_USERS":
            return {...state,
                items: action.users,
                totalCount: action.totalCount,
                error: action.error
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

/* Types */
type UsersStoriesInitialStateType = {
    items: UserType[]
    totalCount: number | null
    pageSize: number
    error: string | null
}

type UsersStoriesActionTypes =
    ReturnType<typeof getUsersAC>;