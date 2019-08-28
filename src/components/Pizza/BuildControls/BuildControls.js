import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {

    return (
        < div className={classes.BuildControls} >
            <strong><p>Current Price: <span>&#8377;</span>{props.price.toFixed(2)}</p></strong>
            {props.toppings.map(topping => (
                <BuildControl
                    label={topping.label}
                    key={topping.id}
                    add={() => props.add(topping.name)}
                    remove={() => props.remove(topping.name)}
                    disabled={props.disabled[topping.name]} />
            ))}
            <button 
                className={classes.OrderButton}
                disabled={props.isAuthenticated}
                onClick={props.orderNow}>
                {props.isAuthenticated ? "ADD TOPPINGS TO ORDER!" : "SIGN UP TO ORDER"}
            </button>
        </div >
    );
};

export default buildControls;