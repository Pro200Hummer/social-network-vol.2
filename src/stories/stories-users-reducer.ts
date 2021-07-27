
export const stateForUsersStories: UsersStoriesInitialStateType = {
    items: [],
    totalCount: 0,
    pageSize: 100,
    currentPage: 10,
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
        case "CHANGE_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
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
export const changeCurrentPageAC = (currentPage: number) => ({type:"CHANGE_CURRENT_PAGE", currentPage} as const)

/* Types */
export type UsersStoriesInitialStateType = {
    items: UserType[]
    totalCount: number
    pageSize: number
    currentPage: number
    error: string | null
}

type UsersStoriesActionTypes =
    | ReturnType<typeof getUsersAC>
    | ReturnType<typeof changeCurrentPageAC>
