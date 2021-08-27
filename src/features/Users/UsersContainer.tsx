import React, {FC, memo, useCallback, useEffect} from 'react'
import {Users} from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentPage, followTC, getUsersTC, unfollowTC, UsersInitialStateType} from "./users-reducer";
import {AppRootStateType} from "../../app/store";


export const UsersContainer: FC = memo(() => {

    const users = useSelector<AppRootStateType, UsersInitialStateType>(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersTC(users.currentPage, users.pageSize))
    },[dispatch, users.currentPage, users.pageSize])

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