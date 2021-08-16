import React from 'react'
import {NavBar} from "../NavBar/NavBar";
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";



export const Header: React.FC = React.memo(() => {
    return <AppBar position="static">
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
    </AppBar>
})