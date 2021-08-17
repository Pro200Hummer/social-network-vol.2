import {AppThunkType} from "../../app/store";
import {authApi, LoginRequestType} from "../../api/social-network-api";
import {setIsLoggedInAC} from "../../stories/stories-reducers/stories-auth-reducer";
import {handlerServerAppError, handlerServerNetworkError} from "../../utils/app-utils";
import {setStatus} from "../../app/app-reducer";

export const authReducerInitialState: AuthReducerInitialStateType = {
    isLoggedIn: true
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

/* Action creators */
export const setIsLoggedIn = (value: boolean) => ({type: "LOGIN/SET_IS_LOGGED_IN", value} as const)

/* Thunk */
export const loginTC = (values: LoginRequestType):AppThunkType => dispatch => {
    dispatch(setStatus("loading"))
    authApi.login(values)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(setIsLoggedInAC(true))
            }else{
                handlerServerAppError(res.data, dispatch)
            }
            dispatch(setStatus("succeed"))
        })
        .catch(error => {
            handlerServerNetworkError(error, dispatch)
        })
}


/* Types */
export type AuthReducerInitialStateType = {
    isLoggedIn: boolean
}

export type AuthReducerActionsType =
    |ReturnType<typeof setIsLoggedIn>