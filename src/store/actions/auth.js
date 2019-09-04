import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCnGAkIFbOl4GfvA8lDjGlNIO6455V51TU';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCnGAkIFbOl4GfvA8lDjGlNIO6455V51TU';
        }

        axios.post(url, authData).then(response => {
            console.log(response.data);
            const authData = {
                tokenId: response.data.idToken,
                userId: response.data.localId,
            }
            localStorage.setItem('token', authData.tokenId);
            localStorage.setItem('userId', authData.userId);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(authData));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        }).catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error));
        });

    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < Date.now()) {
                dispatch(authLogout());
            } else {
                const authData = {
                    token: token,
                    userId: localStorage.getItem('userId'),
                }
                dispatch(authSuccess(authData));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
}