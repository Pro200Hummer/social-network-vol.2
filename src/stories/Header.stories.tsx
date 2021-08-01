import React from 'react'
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';


export default {
    title: 'Social_Network/Header_Component'
}


export const Header = () => {
    return <AppBar position="static">
        <Toolbar variant="dense">
            <Grid container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
            >
                <Grid item xs={4}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="inherit">
                        Social Network
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
}
