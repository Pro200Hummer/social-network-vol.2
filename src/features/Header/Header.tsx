import React from 'react'
import {NavBar} from "../NavBar/NavBar";
import {AppBar, Button, Grid, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {AppStatusType} from "../../app/app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useStyles} from "../../utils/styles-util";




export const Header: React.FC = React.memo(() => {

    const classes = useStyles();
    const preloaderStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

    return <AppBar position="static" className={classes.bar}>
        <Toolbar variant="dense">
            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
            >
                <Grid item xs={ 4 }>
                    <NavBar/>
                </Grid>
                <Grid item xs={ 4 }>
                    <Typography variant="h6" color="inherit">
                        Social Network
                    </Typography>
                </Grid>
                <Grid item xs={ 4 }>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Grid>
            </Grid>
        </Toolbar>
        {preloaderStatus === "loading" && <LinearProgress color="secondary" className={classes.preloader}/>}
    </AppBar>
})