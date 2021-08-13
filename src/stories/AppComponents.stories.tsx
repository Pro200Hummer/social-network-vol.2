import React, {useReducer} from 'react'
import {Button, Grid, LinearProgress, makeStyles, Snackbar, Theme} from '@material-ui/core'
import {
    appStoriesReducer,
    setErrorMessageAC,
    setStatusAC,
    stateForAppReducer
} from "./stories-reducers/stories-app-reducer";
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';


export default {
    title: 'Social_Network/App_Components'
}


export const ProgressComponent = () => {

    const [state, dispatch] = useReducer(appStoriesReducer, stateForAppReducer)

    const startProgress = () => {
        dispatch(setStatusAC("loading"))
    }
    const stopProgress = () => {
        dispatch(setStatusAC("succeed"))
    }

    const setErrorMessage = () => {
        dispatch(setErrorMessageAC("Wow! This is new error"))
    }

    const zeroingError = () => {
        dispatch(setErrorMessageAC(null))
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={ 12 }>
                { state.status === "loading" && <LinearProgress color="secondary"/> }
            </Grid>
            <Grid container item xs={ 12 }>
                <Grid item xs={ 6 }>
                    <Button variant="contained" color="secondary" onClick={ startProgress }>
                        Progress start
                    </Button>
                </Grid>
                <Grid item xs={ 6 }>
                    <Button variant="contained" color="primary" onClick={ stopProgress }>
                        Progress Stop
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={ 4 }>
                <Button variant="contained" color="primary" onClick={ setErrorMessage }>
                    Show Error
                </Button>
            </Grid>
            <ErrorMessageComponent
                error={state.errorMessage}
                zeroingError={zeroingError}
            />
        </Grid>
    )
};

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

export const ErrorMessageComponent = (props: ErrorMessageComponentPropsType) => {
    const classes = useStyles();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.zeroingError()
    };

    const isOpen = props.error !== null

    return (
        <div className={ classes.root }>
            <Snackbar open={ isOpen } autoHideDuration={ 6000 } onClose={ handleClose }>
                <Alert onClose={ handleClose } severity="error">
                    { props.error }
                </Alert>
            </Snackbar>
        </div>
    );
}

/* Types */
type ErrorMessageComponentPropsType = {
    error: string | null
    zeroingError: () => void
}

