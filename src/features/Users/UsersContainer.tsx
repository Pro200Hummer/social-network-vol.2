import React, {useCallback, useEffect} from 'react'
import {Users} from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentPage, followTC, getUsersTC, unfollowTC, UsersReducerInitialStateType} from "./users-reducer";
import {AppRootStateType} from "../../app/store";


export const UsersContainer: React.FC = React.memo(() => {

    const users = useSelector<AppRootStateType, UsersReducerInitialStateType>(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersTC(users.currentPage, users.pageSize))
    }, [users.currentPage])

    const pages = Math.ceil(users.totalCount / users.pageSize)

    const changePageNumber = useCallback((page: number) => {
        dispatch(changeCurrentPage(page))
    }, [dispatch])

    const changeFollowingStatus = useCallback((trigger: string | undefined, userID: number) => {
        if(trigger === "unfollow"){
            dispatch(followTC(userID))
        }else if(trigger === "follow"){
            dispatch(unfollowTC(userID))
        }
    }, [dispatch])

    return (
        <>
            <Users
                users={users}
                pages={pages}
                changePageNumber={changePageNumber}
                changeFollowingStatus={changeFollowingStatus}
            />
        </>
    )
});