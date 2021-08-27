import {AppThunkType} from "./store";
import {authApi} from "../api/social-network-api";
import {handlerServerAppError, handlerServerNetworkError} from "../utils/app-utils";
import {setIsLoggedIn} from "../features/Auth/auth-reducer";

export type AppStatusType = "idle" | "loading" | "succeed" | "failed"

export type AppInitialStateType = {
    status: AppStatusType
    errorMessage: string | null
    isInitialize: boolean
}
export type AppReducerActionsType =
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setErrorMessage>
    | ReturnType<typeof setInitialize>

const InitialState: AppInitialStateType = {
    status: "idle",
    errorMessage: null,
    isInitialize: false
}

export const setStatus = (status: AppStatusType) => ({type: "APP/SET_STATUS", status} as const)
export const setErrorMessage = (errorMessage: string | null) => ({type: "APP/SET_ERROR_MESSAGE", errorMessage} as const)
export const setInitialize = (setValue: boolean) => ({type: "APP/SET_INIT", setValue} as const)

export const appReducer = (state = InitialState, action: AppReducerActionsType) => {
        switch (action.type) {
            case "APP/SET_STATUS":
                return {...state, status: action.status}
            case "APP/SET_ERROR_MESSAGE":
                return {...state, errorMessage: action.errorMessage}
            case "APP/SET_INIT":
                return {...state, isInitialize: action.setValue}
            default:
                return state
        }
    };

export const isInitializeTC = (): AppThunkType => dispatch => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            } else {
                handlerServerAppError(res.data, dispatch)
            }
            dispatch(setInitialize(true))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}

