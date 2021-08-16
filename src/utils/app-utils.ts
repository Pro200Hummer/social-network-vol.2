import {Dispatch} from "redux";
import {ResponseType} from "../api/social-network-api";
import {setErrorMessage} from "../app/app-reducer";


export const handlerServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if(data.messages){
        dispatch(setErrorMessage(data.messages[0]))
    }else{
        dispatch(setErrorMessage("Some error occurred"))
    }
}

export const handlerServerNetworkError = (errorMessage: string | null, dispatch: Dispatch) => {
    dispatch(setErrorMessage(errorMessage))
}