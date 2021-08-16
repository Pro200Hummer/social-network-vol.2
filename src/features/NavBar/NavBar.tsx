import React, {useState} from 'react'
import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MessageIcon from "@material-ui/icons/Message";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import MenuIcon from "@material-ui/icons/Menu";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    link: {
        color: 'black',
        textDecoration: 'none'
    },
});

type Anchor = 'left';

export const NavBar: React.FC = React.memo(() => {
    const classes = useStyles();
    const [state, setState] = useState({
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
                        const setIconItem = () => {
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
                            }
                        }
                        return (
                            <NavLink to={ `/${ text.toLowerCase() }` } className={ classes.link }>
                                <ListItem button key={ text }>
                                    <ListItemIcon>
                                        { setIconItem() }
                                    </ListItemIcon>
                                    <ListItemText primary={ text }/>
                                </ListItem>
                            </NavLink>
                        )
                    }) }
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
})