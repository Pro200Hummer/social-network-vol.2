import React, {useEffect} from 'react';
import {Header} from "../features/Header/Header";
import {Routes} from "../features/Routes";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch} from "react-redux";
import {useStyles} from "../utils/styles-util";
import {isInitializeTC} from "./app-reducer";


export const App = () => {
    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isInitializeTC())
    }, [dispatch])

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

