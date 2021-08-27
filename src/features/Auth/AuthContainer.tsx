import React, {FC, memo} from 'react'
import {Auth} from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import {LoginRequestType} from "../../api/social-network-api";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

export const AuthContainer: FC = memo(() => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    const setLogin = (loginValues: LoginRequestType) => {
        dispatch(loginTC(loginValues))
    }

    if(isLogged){
        return <Redirect to={'/'}/>
    }


    return <Auth setLogin={ setLogin }/>

})