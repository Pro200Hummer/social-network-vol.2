import React, {useReducer} from 'react'
import {stateForAuthReducer, storiesAuthReducer} from "./stories-reducers/stories-auth-reducer";
import {LoginComponent} from "./Login.stories";
import {GetUsers} from "./Users.stories";

export default {
    title: 'Social_Network/AuthorizationFlow_Component'
}

export const AuthorizationFlowStories = () => {
    const[state, dispatch] = useReducer(storiesAuthReducer, stateForAuthReducer)

    if(!state.isLoggedIn){
        return <LoginComponent/>
    }

    return (
        <div>
            <GetUsers/>
        </div>
    )
}