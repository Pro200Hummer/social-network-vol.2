import React, {useEffect, useReducer} from 'react'
import {UserType} from "../features/Users/users-reducer";
import {usersApi} from "../api/social-network-api";
import {Container} from '@material-ui/core';
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default {
    title: 'Social_Network/Users_Component'
}

const initialState: InitialStateType = {
    items: [],
    totalCount: null,
    pageSize: 50,
    error: null

}

const reducer = (state:InitialStateType, action: ActionTypes) => {
    switch (action.type){
        case "SET_USERS":
            return {...state,
            items: action.users,
            totalCount: action.totalCount,
            error: action.error
        }
        default:
            return state
    }
}

/* Action creators */
export const setUsersAC = (users: UserType[], totalCount: number, error: string | null) => ({
    type: "SET_USERS",
    users,
    totalCount,
    error
} as const)

/* Types */
export type InitialStateType = {
    items: UserType[]
    totalCount: number | null
    pageSize: number
    error: string | null
}

export type ActionTypes =
    ReturnType<typeof setUsersAC>

export const Users = () => {

    const [state, dispatch] = useReducer(reducer, initialState)


    useEffect(() => {
        usersApi.getUsers()
            .then(res => {
                dispatch(setUsersAC(res.data.items, res.data.totalCount, res.data.error))
            })
    }, [])

    return (
        <div>
            <Container maxWidth="sm">
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

