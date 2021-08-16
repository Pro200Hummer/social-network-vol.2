export const appReducerInitialState: AppReducerInitialStateType = {
    status: "idle",
    errorMessage: null
}


export const appReducer =
    (state = appReducerInitialState, action: AppReducerActionsType) => {
        switch (action.type) {
            case "APP/SET_STATUS":
                return {...state, status: action.status}
            case "APP/SET_ERROR_MESSAGE":
                return {...state, errorMessage: action.errorMessage}
            default:
                return state
        }
    };

export const setStatus = (status: AppStatusType) => ({type: "APP/SET_STATUS", status} as const)
export const setErrorMessage = (errorMessage: string | null) => ({type: "APP/SET_ERROR_MESSAGE", errorMessage} as const)



/* Types */
export type AppStatusType = "idle" | "loading" | "succeed" | "failed"
export type AppReducerInitialStateType = {
    status: AppStatusType
    errorMessage: string | null
}
export type AppReducerActionsType =
    |ReturnType<typeof setStatus>
    |ReturnType<typeof setErrorMessage>