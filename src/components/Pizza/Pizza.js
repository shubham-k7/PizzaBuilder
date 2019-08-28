import React from 'react';

import ToppingsLayer from './PizzaToppings/ToppingsLayer';
import Crust from './Crust/Crust';

import classes from './Pizza.module.css';

const pizza = (props) => {

    // Repeat the toppings
    let finalToppings = [];
    if (props.toppings) {

        finalToppings = props.toppings.map((top) => {
            return Array(top.quantity).fill(top)
        }).reduce((arr, el, index) => {
            const newArr = el.map((val, ind) => { return { ...val, id: (index) * Number.parseInt(val.id) + ind } })
            return arr.concat(newArr)
        } , []);;
    };

    let message = null;
    if (finalToppings.length === 0) {
        message = <p className={classes.Message}>Please start adding toppings!</p>;
    }

    return (
        <div className={classes.Pizza}>
            <Crust
                name={props.crust}>{message}</Crust>
            <ToppingsLayer toppings={finalToppings} />
        </div>
    );
}

export default pizza;