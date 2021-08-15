import {
    changeCurrentPage,
    follow,
    getUsers, toggleFollowing, unfollow,
    usersReducer,
    UsersReducerInitialStateType,
    UserType
} from "./users-reducer";


let initialState: UsersReducerInitialStateType

beforeEach(() => {
    initialState = {
        items: [
            {
                id: 120,
                name: "User",
                status: "Yo!",
                photos: {
                    small: "",
                    large: ""
                },
                followed: false
            },
            {
                id: 121,
                name: "Bag",
                status: "Wow!",
                photos: {
                    small: "",
                    large: ""
                },
                followed: true
            }],
        totalCount: 0,
        pageSize: 100,
        currentPage: 1,
        followingProgress: [],
        error: null
    }
})

test("users must be received", () => {
    const newUsers: UserType[] = [
        {
            id: 122,
            name: "Pavel",
            status: "Yo!",
            photos: {
                small: "",
                large: ""
            },
            followed: false
        },
        {
            id: 123,
            name: "React",
            status: "Native!",
            photos: {
                small: "",
                large: ""
            },
            followed: true
        }
    ]

    const action = getUsers(newUsers, 1, null)
    const endState = usersReducer(initialState, action)

    expect(initialState.items.length).toBe(2)
    expect(endState.items.length).toBe(2)
    expect(endState.totalCount).toBe(1)
    expect(endState.error).toBe(null)
});

test("the current page needs to be changed", () => {

    const action = changeCurrentPage(3)
    const endState = usersReducer(initialState, action)

    expect(initialState.currentPage).toBe(1)
    expect(endState.currentPage).toBe(3)

});

test("set follow", () => {

    const action = follow(120)
    const endState = usersReducer(initialState, action)

    //@ts-ignore
    expect(endState.items.find(i => i.id === 120).followed).toBeTruthy()
});

test("set unfollow", () => {

    const action = unfollow(121)
    const endState = usersReducer(initialState, action)

    //@ts-ignore
    expect(endState.items.find(i => i.id === 121).followed).toBeFalsy()
});

test("toggle following test", () => {

    const action = toggleFollowing(true, 120)
    const endState = usersReducer(initialState, action)

    //@ts-ignore
    expect(endState.followingProgress.length).toBe(1)
    expect(endState.followingProgress[0]).toBe(120)
});