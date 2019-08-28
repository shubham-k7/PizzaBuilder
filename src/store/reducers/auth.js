import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utiltiy';

const initialState = {
    authData: null,
    loading: false,
    error: null,
}

const authStart = (state, action) => {
    return updateObject(state, { loading: true, error: null, });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        authData: action.authData,
        loading: false,
        error: null,
    })
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        authData: null,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
}

export default reducer;