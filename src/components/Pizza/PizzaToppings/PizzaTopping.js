import React from 'react';

import classes from './PizzaTopping.module.css';

const pizzaTopping = (props) => { // props.proptypes

    // toppings: [
    //     { id: '1', name: 'pepperoni', label: 'Pepperoni', isVeg: false, quantity: 3, },
    //     { id: '2', name: 'olive', label: 'Olive', isVeg: true, quantity: 3 },
    //     { id: '3', name: 'mushroom', label: 'Mushroom', isVeg: true, quantity: 3 },
    //     { id: '4', name: 'chicken', label: 'Chicken', isVeg: false, quantity: 3 },
    // ],

    // props.toppings.map((top,i) =>)
    let assignedClasses = null;
    // Array(props.topping.quantity).fill(props.topping.quantity).map((top, i) => {    
        const temp = "topping-" + props.index;
        assignedClasses = classes[props.topping.name] + " " + classes[temp];
    // });
    

    return (
        // <div className={classes.Pizza}>
            <div className={assignedClasses}></div>
        // </div>
    );
};

export default pizzaTopping;