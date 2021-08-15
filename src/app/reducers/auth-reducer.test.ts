import {authReducer, AuthReducerInitialStateType, setIsLoggedIn} from "./auth-reducer";

let initialState: AuthReducerInitialStateType

beforeEach(() => {
    initialState = {
        isLoggedIn: false
    }
});

test("login status should be set", () => {
    const action = setIsLoggedIn(true)
    const endState = authReducer(initialState, action)

    expect(endState.isLoggedIn).toBeTruthy()
})

