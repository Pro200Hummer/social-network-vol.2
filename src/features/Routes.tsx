import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {UsersContainer} from "./Users/UsersContainer";
import {AuthContainer} from "./Auth/AuthContainer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../app/store";
import {ProfileContainer} from "./Profile/ProfileContainer";
import { CircularProgress } from '@material-ui/core';


export const PATH = {
    PROFILE: "/profile",
    USERS: "/users",
    AUTH: "/login",
    ERROR_404: '/404'
}


export const Routes = () => {

    const isInitialize = useSelector<AppRootStateType, boolean>(state => state.app.isInitialize)

    if(!isInitialize){
        return <div style={ {position: 'fixed', top: '30%', textAlign: 'center', width: '100%'} }>
            <CircularProgress/>
        </div>
    }

    return (
        <>
            <Switch>
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.PROFILE} render={() => <ProfileContainer/>}/>
                <Route path={ PATH.USERS } render={ () => <UsersContainer/> }/>
                <Route path={ PATH.AUTH } render={ () => <AuthContainer/> }/>
                <Redirect from={ '*' } to={ PATH.ERROR_404 }/>
            </Switch>
        </>
    )
}