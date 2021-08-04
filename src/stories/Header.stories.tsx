import React from 'react'
import {
    AppBar,
    Button, Drawer,
    Grid,
    IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MusicNoteIcon from '@material-ui/icons/MusicNote';


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
}

/* NavBar Component */
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },

});

type Anchor = 'left';

export const NavBar = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false

    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor: Anchor) => {
        const listItems = ['Profile', 'Dialogs', 'Users', 'News', 'Music']

        return (
            <div
                role="presentation"
                onClick={ toggleDrawer(anchor, false) }
                onKeyDown={ toggleDrawer(anchor, false) }
            >
                <List className={ classes.list }>
                    { listItems.map((text) => {
                        const getIconItem = () => {
                            switch (text) {
                                case "Profile":
                                    return <PersonIcon/>
                                case "Dialogs":
                                    return <MessageIcon/>
                                case "Users":
                                    return <PeopleOutlineIcon/>
                                case "News":
                                    return <ReceiptIcon/>
                                case "Music":
                                    return <MusicNoteIcon/>
                            }}
                        return (
                            <ListItem button key={ text }>
                                <ListItemIcon>
                                    { getIconItem() }
                                </ListItemIcon>
                                <ListItemText primary={ text }/>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    };

    return (
        <div>
            { (['left'] as Anchor[]).map((anchor) => (
                <React.Fragment key={ anchor }>
                    <IconButton aria-label="main-menu" onClick={ toggleDrawer(anchor, true) } color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Drawer anchor={ anchor } open={ state[anchor] } onClose={ toggleDrawer(anchor, false) }>
                        { list(anchor) }
                    </Drawer>
                </React.Fragment>
            )) }
        </div>
    );
}
