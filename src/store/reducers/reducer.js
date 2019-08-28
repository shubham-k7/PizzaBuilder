import * as actionTypes from './actions';
import { TOPPING_LIST } from '../../Constants/Constants';

const initialState = {
    crust: "New Hand tossed",
    totalPrice: 0,
    currentToppings: [],
    availableToppings: [...TOPPING_LIST],
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_TOPPINGS:
            console.log(action);
            const index = state.currentToppings.findIndex((top) => { return top.name === action.name });
            if (index !== -1) {
                return state;
            }
            const newInd = state.availableToppings.findIndex((top) => { return top.name === action.name });
            const newTopping = {
                ...state.availableToppings[newInd]
            }

            console.log(newTopping);
            return {
                ...state,
                currentToppings: state.currentToppings.concat(newTopping),
                totalPrice: state.totalPrice + newTopping.price,
            };
        case actionTypes.REMOVE_TOPPINGS:
            const ind = state.currentToppings.findIndex((top) => { return top.name === action.name });
            if (ind === -1) {
                return state;
            }
            return {
                ...state,
                currentToppings: state.currentToppings.filter(topping => topping.name !== action.name),
                totalPrice: state.totalPrice - state.currentToppings[ind].price,
            };
        default:
            return state;
    }
}

export default reducer;