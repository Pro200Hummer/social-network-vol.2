import React, {FC, memo} from 'react';
import { Profile } from './Profile';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

export const ProfileContainer: FC = memo(() => {
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if(!isLogged){
        return <Redirect to={'/login'}/>
    }
    return (
        <>
            <Profile/>
        </>
    )
})