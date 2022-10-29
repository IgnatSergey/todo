import { authAPI } from "../api/api";

const SET_MY_PROFILE_DATA = 'SET-MY-PROFILE-DATA';

let initialState = {
    userId: null,
    email: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_PROFILE_DATA:
            return {
                ...state, ...action.data
            }
        default:
            return state;
    }
}

export const setMyProfileData = (userId, email, isAuth) => {
    return { type: SET_MY_PROFILE_DATA, data: { userId, email, isAuth } };
}

export const loginThunkCreator = (email, password) => {
    return async (dispatch) => {
        const response = await authAPI.login(email, password);
        if (response.errorCode === 0) {
            const { id } = response.user;
            console.log(response)
            dispatch(setMyProfileData(id, email, true))
        }
    }
}

export const registrateThunkCreator = (email, password) => {
    return async (dispatch) => {
        const response = await authAPI.registrate(email, password);
        if (response.erroreCode === 0) {
            const { id } = response.user;
            dispatch(setMyProfileData(id, email, false))
        }
    }
}

export { authReducer }
