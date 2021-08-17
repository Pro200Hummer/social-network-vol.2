import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
    /* Header styles */
    bar:{
        position: 'absolute',
        top: 0,
        left: 0
    },
    preloader: {
        position: 'relative'
    },
    /* NavBar styles */
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
    /* Users styles */
    container: {
        marginTop: '70px'
    }
});