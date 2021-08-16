import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {usersReducer, UsersReducerActionTypes} from "../features/Users/users-reducer";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {authReducer, AuthReducerActionsType} from "../features/Auth/auth-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType =
    | UsersReducerActionTypes
    | AppReducerActionsType
    | AuthReducerActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store

