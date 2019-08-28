import React from "react";
import Pizza from '../../Pizza/Pizza';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <div style={{width: '100%', margin: 'auto'}}>
                <Pizza
                    toppings={props.toppings}
                    crust={props.crust} />
            </div>
            <h1>We hope it tastes well!!</h1>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;