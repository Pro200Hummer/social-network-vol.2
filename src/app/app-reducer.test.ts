import {appReducer, AppReducerInitialStateType, setErrorMessage, setStatus} from "./app-reducer";


let initialState: AppReducerInitialStateType
beforeEach(() => {
    initialState = {
        status: "idle",
        errorMessage: null
    }
})

test("status should be changed", () => {
    const action = setStatus("loading")
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe("loading")
})

test("error message should be set ", () => {
    const action = setErrorMessage("sorry!")
    const endState = appReducer(initialState, action)

    expect(endState.errorMessage).toBe("sorry!")
})