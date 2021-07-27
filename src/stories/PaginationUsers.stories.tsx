import React, {useEffect, useState} from "react";
import {usersApi} from "../api/social-network-api";
import {UserType} from "../features/Users/users-reducer";
import {Pagination} from "@material-ui/lab";

export default {
    title: 'Social_Network/Pagination_Users'
}

export const PaginationUsers = () => {

    const[users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        usersApi.getUsers()
            .then(res => {
                setUsers(res.data.items)
            })
    }, [])

    return (
        <div>
            <Pagination count={10} color="primary" />
            <hr/>
            {JSON.stringify(users)}
        </div>
    )
}