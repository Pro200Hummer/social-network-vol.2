export const stateForAuthReducer: StoriesAuthReducerStateType = {
    isLoggedIn: false
}


export const storiesAuthReducer =
    (state = stateForAuthReducer, action: StoriesAuthReducerActionsType) => {
        switch (action.type){
            default:
                return state
        }
    };

export const setIsLoggedInAC = (value: boolean) => ({type: "LOGIN/SET_IS_LOGGED_IN", value} as const)


/* Types */
export type StoriesAuthReducerStateType = {
    isLoggedIn: boolean
}

export type StoriesAuthReducerActionsType =
    |ReturnType<typeof setIsLoggedInAC>














