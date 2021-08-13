import React, {useCallback, useEffect, useReducer} from 'react'
import {followingApi, usersApi} from "../api/social-network-api";
import {Container} from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
    changeCurrentPageAC, followAC,
    getUsersAC, stateForUsersReducer, toggleFollowingAC, unfollowAC,
    usersStoriesReducer
} from "./stories-reducers/stories-users-reducer";
import {Pagination} from "@material-ui/lab";

export default {
    title: 'Social_Network/Users_Component'
}


export const GetUsers = () => {

    const [state, dispatch] = useReducer(usersStoriesReducer, stateForUsersReducer)

    useEffect(() => {
        usersApi.getUsers(state.currentPage, state.pageSize)
            .then(res => {
                dispatch(getUsersAC(res.data.items, res.data.totalCount, res.data.error))
            })
    }, [state.currentPage])

    const pages = Math.ceil(state.totalCount / state.pageSize)

    const changePageNumber = useCallback((page: number) => {
        dispatch(changeCurrentPageAC(page))
    }, [dispatch])

    const changeFollowingStatus = useCallback((trigger: string | undefined, userID: number) => {
        if(trigger === "unfollow"){
            dispatch(toggleFollowingAC(true, userID))
            followingApi.unfollow(userID)
                .then(res => {
                    if(res.data.resultCode === 0){
                        dispatch(unfollowAC(userID))
                    }
                    dispatch(toggleFollowingAC(false, userID))
                })
        }else if(trigger === "follow"){
            dispatch(toggleFollowingAC(true, userID))
            followingApi.follow(userID)
                .then(res => {
                    if(res.data.resultCode === 0){
                        dispatch(followAC(userID))
                    }
                    dispatch(toggleFollowingAC(false, userID))
                })
        }
    }, [dispatch])

    return (
        <div>
            <Container maxWidth="sm">
                <Pagination
                    count={ pages }
                    color="primary"
                    onChange={ (e, page) => changePageNumber(page) }
                />
                { state.items.map(u => {
                    const button = u.followed ?
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            data-following="unfollow"
                            disabled={state.followingProgress.some(id => id === u.id)}
                            onClick={e => changeFollowingStatus(e.currentTarget.dataset.following, u.id)}
                        >
                            Unfollow
                        </Button> :
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            data-following="follow"
                            disabled={state.followingProgress.some(id => id === u.id)}
                            onClick={e => changeFollowingStatus(e.currentTarget.dataset.following, u.id)}
                        >
                            Follow
                        </Button>

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
                                        { button }
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

