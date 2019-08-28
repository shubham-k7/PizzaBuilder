import React from 'react';

import pizzaLogo from '../../assets/images/logo.jpg';
import classes from './Logo.module.css';
const logo = (props) => (
    <div className={classes.Logo}>
        <img src={pizzaLogo} alt="Pizza" />
    </div>
);

export default logo;