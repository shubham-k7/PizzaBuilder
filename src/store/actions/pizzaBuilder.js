import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addToppings = (name) => {
    return {
        type: actionTypes.ADD_TOPPINGS,
        name: name,
    }
}

export const removeToppings = (name) => {
    return {
        type: actionTypes.REMOVE_TOPPINGS,
        name: name,
    }
}

export const setToppings = (toppings) => {
    return {
        type: actionTypes.SET_TOPPINGS,
        availableToppings: toppings,
    }
}

export const fetchToppingsFail = () => {
    return {
        type: actionTypes.FETCH_TOPPINGS_FAILED,
    }
}

export const initToppings = () => {
    return dispatch => {
        axios.get('https://pizzabui.firebaseio.com/toppings.json')
            .then( response => {
                dispatch(setToppings(response.data));
            })
            .catch( error => {
                dispatch(fetchToppingsFail());
            })
    };
}
