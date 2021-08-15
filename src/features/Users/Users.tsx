import React from 'react'
import {Container} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {UsersReducerInitialStateType} from "./users-reducer";


type UsersPropsType = {
    users: UsersReducerInitialStateType
    pages: number
    changePageNumber: (page: number) => void
    changeFollowingStatus: (trigger: string | undefined, userID: number) => void

}

export const Users: React.FC<UsersPropsType> = React.memo((props) => {
    const{
        users,
        pages,
        changePageNumber,
        changeFollowingStatus
    } = props

    return (
        <>
            <Container maxWidth="sm">
                <Pagination
                    count={ pages }
                    color="primary"
                    onChange={ (e, page) => changePageNumber(page) }
                />
                { users.items.map(u => {
                    const button = u.followed ?
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            data-following="unfollow"
                            disabled={users.followingProgress.some(id => id === u.id)}
                            onClick={e => changeFollowingStatus(e.currentTarget.dataset.following, u.id)}
                        >
                            Unfollow
                        </Button> :
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            data-following="follow"
                            disabled={users.followingProgress.some(id => id === u.id)}
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
        </>
    )
});