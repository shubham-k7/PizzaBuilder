import React from 'react';
import { TOPPING_PRICE_LIST } from '../../../Constants/Constants';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    // const crust = props.crust;
    const toppingsSummary = props.toppings.map(top => {
        return <li key={top.id}>
            <span style={{ fontWeight: 'bold' }}>{top.label}</span>, Price: <strong><span>&#8377;</span> {TOPPING_PRICE_LIST[top.name].toFixed(2)}</strong>
        </li>
    });
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious pizza with the following toppings and crust:</p>
            <p>{props.crust}</p>
            <ul>
                {toppingsSummary}
            </ul>
            <p><strong>Total Price: <span>&#8377;</span> {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout??</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </React.Fragment>
    );
};

export default orderSummary;