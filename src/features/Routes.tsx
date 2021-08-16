import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {UsersContainer} from "./Users/UsersContainer";
import {AuthContainer} from "./Auth/AuthContainer";


export const PATH = {
    USERS: "/users",
    AUTH: "/login",
    ERROR_404: '/404'
}


export const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path={ PATH.USERS } render={ () => <UsersContainer/> }/>
                <Route exact path={ PATH.AUTH } render={ () => <AuthContainer/> }/>
                <Redirect from={ '*' } to={ PATH.ERROR_404 }/>
            </Switch>
        </>
    )
}