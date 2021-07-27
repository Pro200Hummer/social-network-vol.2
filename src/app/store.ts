import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {usersReducer, UsersReducerActionType} from "../features/Users/users-reducer";

const rootReducer = combineReducers({
    users: usersReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootType = ReturnType<typeof rootReducer>

export type AppActionsType = UsersReducerActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootType, unknown, AppActionsType>

// @ts-ignore
window.store = store

