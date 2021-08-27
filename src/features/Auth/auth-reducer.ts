import {AppThunkType} from "../../app/store";
import {authApi, LoginRequestType} from "../../api/social-network-api";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/app-utils";
import {setStatus} from "../../app/app-reducer";

export type AuthInitialStateType = {
    isLoggedIn: boolean
}

export type AuthReducerActionsType =
    |ReturnType<typeof setIsLoggedIn>

const InitialState: AuthInitialStateType = {
    isLoggedIn: false
}

export const setIsLoggedIn = (value: boolean) => ({type: "LOGIN/SET_IS_LOGGED_IN", value} as const)

export const authReducer = (state = InitialState, action: AuthReducerActionsType) => {
        switch (action.type){
            case "LOGIN/SET_IS_LOGGED_IN":
                return {...state, isLoggedIn: action.value}
            default:
                return state
        }
    };

export const loginTC = (values: LoginRequestType):AppThunkType => dispatch => {
    dispatch(setStatus("loading"))
    authApi.login(values)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedIn(true))
            }else{
                handlerServerAppError(res.data, dispatch)
            }
            dispatch(setStatus("succeed"))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}

