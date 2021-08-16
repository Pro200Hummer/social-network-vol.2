import React from 'react';
import {Header} from "../features/Header/Header";
import {Routes} from "../features/Routes";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


export const App = () => {

    return (
        <>
            <Header/>
            <Routes/>
            <ErrorSnackbar/>
        </>
    )
}

