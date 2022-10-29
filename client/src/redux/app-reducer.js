import { authAPI } from "../api/api";
import { setMyProfileData } from "./auth-reducer";
import jwt_decode from "jwt-decode";

const INITIALIZED_SUCCSESS = 'INITIALIZED_SUCCSESS';

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCSESS:
            return {
                ...state, initialized: true
            }
        default:
            return state;
    }
}

export const initializedSuccess = () => {
    return { type: INITIALIZED_SUCCSESS };
}

export const checkAuthThunkCreator = () => {
    return async (dispatch) => {
        const response = await authAPI.check()
        console.log(response)
        if (response.data.errorCode === 0) {
            const { token } = response.data;
            localStorage.setItem('token', token)
            const { id, email } = jwt_decode(token);
            console.log(jwt_decode(token))
            dispatch(setMyProfileData(id, email, true))
        }
        dispatch(initializedSuccess())
    }
}

export default appReducer;