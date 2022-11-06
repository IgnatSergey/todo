import { authAPI } from "../api/api";

const SET_MY_PROFILE_DATA = 'SET-MY-PROFILE-DATA';
const SET_ERROR_AUTH = 'SET-ERROR-AUTH';
const SET_STATUS_REGISTRATION = 'SET_STATUS_REGISTRATION';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    errorAuth: null,
    statusRegistration: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MY_PROFILE_DATA:
            return {
                ...state, ...action.data
            }
        case SET_ERROR_AUTH:
            return {
                ...state, errorAuth: action.errorAuth
            }
        case SET_STATUS_REGISTRATION:
            return {
                ...state, statusRegistration: action.statusRegistration
            }
        default:
            return state;
    }
}

export const setMyProfileData = (userId, email, login, isAuth) => {
    return { type: SET_MY_PROFILE_DATA, data: { userId, email, login, isAuth } };
}

export const setErrorAuth = (errorAuth) => {
    return { type: SET_ERROR_AUTH, errorAuth };
}

export const setStatusRegistration = (statusRegistration) => {
    return { type: SET_STATUS_REGISTRATION, statusRegistration };
}

export const loginThunkCreator = (login, password) => {
    return async (dispatch) => {
        try {
            dispatch(setErrorAuth(null))
            const response = await authAPI.login(login, password);
            const { id, email } = response.user;
            dispatch(setMyProfileData(id, email, login, true))
        } catch (error) {
            dispatch(setErrorAuth(error.response.data.message))
        }
    }
}

export const registrateThunkCreator = (email, login, password) => {
    return async (dispatch) => {
        try {
            dispatch(setErrorAuth(null))
            dispatch(setStatusRegistration(false))
            await authAPI.registrate(email, login, password);
            dispatch(setStatusRegistration(true))
        } catch (error) {
            dispatch(setErrorAuth(error.response.data.message))
        }
    }
}

export { authReducer }
