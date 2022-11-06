export const getMyUserId = (state) => {
    return state.auth.userId;
}

export const getAuthStatus = (state) => {
    return state.auth.isAuth;
}

export const getLogin = (state) => {
    return state.auth.login;
}

export const getErrorAuth = (state) => {
    return state.auth.errorAuth;
}

export const getStatusRegistration = (state) => {
    return state.auth.statusRegistration;
}
