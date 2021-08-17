import React from 'react'
import {Auth} from "./Auth";
import {useDispatch, useSelector} from "react-redux";
import {LoginRequestType} from "../../api/social-network-api";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import { Redirect } from 'react-router-dom';

export const AuthContainer: React.FC = React.memo(() => {

    const dispatch = useDispatch()

    const setLogin = (loginValues: LoginRequestType) => {
        dispatch(loginTC(loginValues))
    }

    return <Auth setLogin={ setLogin }/>

})