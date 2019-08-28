import React from 'react';

import PizzaTopping from './PizzaTopping';

const toppingsLayer = (props) => {

    return props.toppings.map((top, i) => (    
        <PizzaTopping
            topping={top} key={i} index={i + 1}/>
    ));
};

export default toppingsLayer;