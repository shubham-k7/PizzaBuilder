import React from 'react';

import classes from './Crust.module.css';

const crust = (props) => {

    let assignedClasses = `${classes.Crust} ${classes[props.name]}`; 
    // if( listNma)
    return (
        <div className={assignedClasses}>{props.children}</div>
    );
};

export default crust;