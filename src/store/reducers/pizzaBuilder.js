import * as actionTypes from '../actions/actionTypes';
import { TOPPING_LIST } from '../../Constants/Constants';
import { updateObject, updateArray } from '../utiltiy';

const initialState = {
    crust: "New Hand tossed",
    totalPrice: 0,
    currentToppings: [],
    availableToppings: null,
    error: false,
    building: false,

}

const addToppings = (state, action) => {

    const newInd = state.availableToppings.findIndex((top) => { return top.name === action.name });
    const newTopping = updateObject(state.availableToppings[newInd]);
    const updatedState = {
        currentToppings: state.currentToppings.concat(newTopping),
        totalPrice: state.totalPrice + newTopping.price,
        building: true,
    }
    return updateObject(state, updatedState)
}

const removeToppings = (state, action) => {
    const ind = state.currentToppings.findIndex((top) => { return top.name === action.name });
    if (ind === -1) {
        return state;
    }
    return updateObject(state, {
        building: true,
        currentToppings: state.currentToppings.filter(topping => topping.name !== action.name),
        totalPrice: state.totalPrice - state.currentToppings[ind].price,
        building: true,
    });
}

const setToppings = (state, action) => {
    return updateObject(state, {
        availableToppings: action.availableToppings,
        error: false,
        totalPrice: 0,
        currentToppings: [],
        building: false,
    });
}

const fetchToppingsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_TOPPINGS: return addToppings(state, action);
        case actionTypes.REMOVE_TOPPINGS: return removeToppings(state, action);
        case actionTypes.SET_TOPPINGS: return setToppings(state, action);
        case actionTypes.FETCH_TOPPINGS_FAILED: return fetchToppingsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;