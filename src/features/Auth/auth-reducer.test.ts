import {authReducer, AuthInitialStateType, setIsLoggedIn} from "./auth-reducer";

let initialState: AuthInitialStateType

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

