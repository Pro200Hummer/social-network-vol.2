import {appReducer, AppInitialStateType, setInitialize, setErrorMessage, setStatus} from "./app-reducer";


let initialState: AppInitialStateType
beforeEach(() => {
    initialState = {
        status: "idle",
        errorMessage: null,
        isInitialize: false
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
    const action = setInitialize(true)
    const endState = appReducer(initialState, action)

    expect(endState.isInitialize).toBeTruthy()
})