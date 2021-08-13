export const stateForAppReducer: AppReducerStoriesStateType = {
    status: "idle",
    errorMessage: null
}


export const appStoriesReducer =
    (state = stateForAppReducer, action: AppStoriesReducerActionsType) => {
    debugger
        switch (action.type) {
            case "APP/SET_STATUS":
                return {...state, status: action.status}
            case "APP/SET_ERROR_MESSAGE":
                return {...state, errorMessage: action.errorMessage}
            default:
                return state
        }
    };

export const setStatusAC = (status: AppStatusType) => ({type: "APP/SET_STATUS", status} as const)
export const setErrorMessageAC = (errorMessage: string | null) => ({type: "APP/SET_ERROR_MESSAGE", errorMessage} as const)



/* Types */
export type AppStatusType = "idle" | "loading" | "succeed" | "failed"
export type AppReducerStoriesStateType = {
    status: AppStatusType
    errorMessage: string | null
}
export type AppStoriesReducerActionsType =
    |ReturnType<typeof setStatusAC>
    |ReturnType<typeof setErrorMessageAC>
