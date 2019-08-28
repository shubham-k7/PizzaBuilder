import * as actionTypes from '../actions/actionTypes';
import { TOPPING_LIST } from '../../Constants/Constants';
import { updateObject, updateArray } from '../utiltiy';

const initialState = {
    crust: "New Hand tossed",
    totalPrice: 0,
    currentToppings: [],
    availableToppings: null,
    error: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_TOPPINGS:
            const newInd = state.availableToppings.findIndex((top) => { return top.name === action.name });
            const newTopping = updateObject(state.availableToppings[newInd]);
            const updatedState = {
                currentToppings: state.currentToppings.concat(newTopping),
                totalPrice: state.totalPrice + newTopping.price
            }
            return updateObject(state, updatedState)

        case actionTypes.REMOVE_TOPPINGS:
            const ind = state.currentToppings.findIndex((top) => { return top.name === action.name });
            if (ind === -1) {
                return state;
            }
            return updateObject(state, {
                currentToppings: state.currentToppings.filter(topping => topping.name !== action.name),
                totalPrice: state.totalPrice - state.currentToppings[ind].price,
            });
        case actionTypes.SET_TOPPINGS:
            return updateObject(state, {
                availableToppings: action.availableToppings,
                error: false,
                totalPrice: 0,
                currentToppings: [],
            });
        case actionTypes.FETCH_TOPPINGS_FAILED:
            return updateObject(state, { error: true })
        default:
            return state;
    }
}

export default reducer;