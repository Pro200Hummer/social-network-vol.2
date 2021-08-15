import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {usersReducer, UsersReducerActionTypes} from "../features/Users/users-reducer";
import {AppReducerActionsType} from "./reducers/app-reducer";
import {AuthReducerActionsType} from "./reducers/auth-reducer";

const rootReducer = combineReducers({
    users: usersReducer
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

