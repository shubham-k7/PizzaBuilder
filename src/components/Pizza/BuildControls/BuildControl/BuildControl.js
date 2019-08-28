import React from 'react';

import classes from './BuildControl.module.css';

const buildControl = ( props ) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.less} onClick={props.add} disabled={props.disabled}>Add</button>
        <button className={classes.More} onClick={props.remove} disabled={!props.disabled}>Remove</button>
    </div>
);

export default buildControl;
