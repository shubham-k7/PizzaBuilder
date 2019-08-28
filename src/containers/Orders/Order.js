import React from 'react';
import classes from './Order.module.css';

const order = (props) => (
    <div className={classes.Order}>
        <p>Order ID: {props.id}</p>
        <p>Toppings: {props.toppings.map(top => {
            return <span key={top.id} style={{display: 'inline-block',margin: '0 5px',padding: '10px', border: '1px solid #ccc', backgroundColor: '#ddd'}}>{top.label} (&#8377; {top.price})</span>
        })}</p>
        <p>Crust: {props.crust}</p>
        <p>Price: <strong> <span>&#8377; {props.price.toFixed(2)}</span></strong></p>
    </div>
);

export default order;