import React from 'react'
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import {makeStyles, Snackbar, Theme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setErrorMessage} from "../../app/app-reducer";



function Alert(props: AlertProps) {
    return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export const ErrorSnackbar: React.FC = () => {
    const errorMessage = useSelector<AppRootStateType, string | null>(state => state.app.errorMessage)

    const dispatch = useDispatch()

    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorMessage(null))
    };

    const isOpen = errorMessage !== null

    return (
        <div className={ classes.root }>
            <Snackbar open={ isOpen } autoHideDuration={ 6000 } onClose={ handleClose }>
                <Alert onClose={ handleClose } severity="error">
                    { errorMessage }
                </Alert>
            </Snackbar>
        </div>
    );
}