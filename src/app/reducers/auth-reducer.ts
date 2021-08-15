export const authReducerInitialState: AuthReducerInitialStateType = {
    isLoggedIn: false
}


export const authReducer =
    (state = authReducerInitialState, action: AuthReducerActionsType) => {
        switch (action.type){
            case "LOGIN/SET_IS_LOGGED_IN":
                return {...state, isLoggedIn: action.value}
            default:
                return state
        }
    };

export const setIsLoggedIn = (value: boolean) => ({type: "LOGIN/SET_IS_LOGGED_IN", value} as const)


/* Types */
export type AuthReducerInitialStateType = {
    isLoggedIn: boolean
}

export type AuthReducerActionsType =
    |ReturnType<typeof setIsLoggedIn>