import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {UsersContainer} from "./Users/UsersContainer";


export const PATH = {
    USERS: "/users",
    ERROR_404: '/404'
}


export const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path={ PATH.USERS } render={ () => <UsersContainer/> }/>
                <Redirect from={ '*' } to={ PATH.ERROR_404 }/>
            </Switch>
        </>
    )
}