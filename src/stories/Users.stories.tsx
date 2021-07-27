import React, {useEffect, useReducer} from 'react'
import {usersApi} from "../api/social-network-api";
import {Container} from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
    changeCurrentPageAC,
    getUsersAC,
    stateForUsersStories,
    usersStoriesReducer
} from "./stories-users-reducer";
import {Pagination} from "@material-ui/lab";

export default {
    title: 'Social_Network/Users_Component'
}


export const GetUsers = () => {

    const [state, dispatch] = useReducer(usersStoriesReducer, stateForUsersStories)

    const pages = Math.ceil(state.totalCount / state.pageSize)

    useEffect(() => {
        usersApi.getUsers(state.currentPage, state.pageSize)
            .then(res => {
                dispatch(getUsersAC(res.data.items, res.data.totalCount, res.data.error))
            })
    }, [])

    const changePageNumber = (page: number) => {
        dispatch(changeCurrentPageAC(page))
        usersApi.getUsers(page, state.pageSize)
            .then(res => {
                dispatch(getUsersAC(res.data.items, res.data.totalCount, res.data.error))
            })
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Pagination
                    count={ pages }
                    color="primary"
                    onChange={ (e, page) => changePageNumber(page) }
                />
                { state.items.map(u => {
                    return <Box component="div" key={ u.id }>
                        <Grid container spacing={ 2 }>
                            <Grid item>
                                <Avatar src={ u.photos.small }/>
                            </Grid>
                            <Grid item xs={ 12 } sm container>
                                <Grid item xs direction="column" spacing={ 3 }>
                                    <Grid item xs>
                                        { u.name }
                                    </Grid>
                                    <Grid item xs>
                                        { u.status }
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="outlined" color="primary" size="small">
                                            Follow
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                }) }
            </Container>
        </div>
    )
}

