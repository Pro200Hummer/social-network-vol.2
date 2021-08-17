import {AppThunkType} from "./store";
import {authApi} from "../api/social-network-api";
import {handlerServerAppError, handlerServerNetworkError} from "../utils/app-utils";

export const appReducerInitialState: AppReducerInitialStateType = {
    status: "idle",
    errorMessage: null,
    isLoggedIn: true
}


export const appReducer =
    (state = appReducerInitialState, action: AppReducerActionsType) => {
        switch (action.type) {
            case "APP/SET_STATUS":
                return {...state, status: action.status}
            case "APP/SET_ERROR_MESSAGE":
                return {...state, errorMessage: action.errorMessage}
            case "APP/SET_AUTHORIZE":
                return {...state, isAuthorized: action.setValue}
            default:
                return state
        }
    };

export const setStatus = (status: AppStatusType) => ({type: "APP/SET_STATUS", status} as const)
export const setErrorMessage = (errorMessage: string | null) => ({type: "APP/SET_ERROR_MESSAGE", errorMessage} as const)
export const setAuthorize = (setValue: boolean) => ({type: "APP/SET_AUTHORIZE", setValue} as const)

/* Thunk */
export const isLoggedInTC = (): AppThunkType => dispatch => {
    dispatch(setStatus("loading"))
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthorize(true))
            } else {
                dispatch(setAuthorize(false))
                handlerServerAppError(res.data, dispatch)
            }
            dispatch(setStatus("succeed"))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}

/* Types */
export type AppStatusType = "idle" | "loading" | "succeed" | "failed"
export type AppReducerInitialStateType = {
    status: AppStatusType
    errorMessage: string | null
    isLoggedIn: boolean
}
export type AppReducerActionsType =
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setErrorMessage>
    | ReturnType<typeof setAuthorize>