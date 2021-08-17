import {appReducer, AppReducerInitialStateType, setAuthorize, setErrorMessage, setStatus} from "./app-reducer";


let initialState: AppReducerInitialStateType
beforeEach(() => {
    initialState = {
        status: "idle",
        errorMessage: null,
        isAuthorized: false
    }
})

test("status should be changed", () => {
    const action = setStatus("loading")
    const endState = appReducer(initialState, action)

    expect(endState.status).toBe("loading")
})

test("error message should be set", () => {
    const action = setErrorMessage("sorry!")
    const endState = appReducer(initialState, action)

    expect(endState.errorMessage).toBe("sorry!")
})

test("authorization check needs to be changed", () => {
    const action = setAuthorize(true)
    const endState = appReducer(initialState, action)

    expect(endState.isAuthorized).toBeTruthy()
})