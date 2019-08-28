import React from 'react';
import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Pizza Builder</NavigationItem>
        { props.isAuth ? <NavigationItem link="/orders" exact>Orders</NavigationItem> : null }
        { props.isAuth ?
            <NavigationItem link="/logout" exact>Logout</NavigationItem> :
            <NavigationItem link="/auth" exact>Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;