import React, {useEffect} from 'react';
import {Header} from "../features/Header/Header";
import {Routes} from "../features/Routes";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch} from "react-redux";
import {useStyles} from "../utils/styles-util";
import {isLoggedInTC} from "./app-reducer";


export const App = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isLoggedInTC())
    }, [])

    return (
        <>
            <Header/>
            <div className={ classes.container }>
                <Routes/>
            </div>
            <ErrorSnackbar/>
        </>
    );


}

