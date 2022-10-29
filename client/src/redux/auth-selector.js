export const getMyUserId = (state) => {
    return state.auth.userId;
}

export const getAuthStatus = (state) => {
    return state.auth.isAuth;
}
