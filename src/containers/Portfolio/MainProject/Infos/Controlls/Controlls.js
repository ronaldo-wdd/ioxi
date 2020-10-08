import React from 'react';

import classes from './Controlls.module.css';
import Button from '../../../../../components/UI/Button/Button';

const Controlls = (props) => {
    return (
        <div className={classes.Controlls}>
            <Button text="SEE MORE" click={props.onShowProject} />
            <div className={classes.NextPrev}>
                <Button type="prev" click={props.onPrevProj} />
                <Button type="next" click={props.onNextProj} />
            </div>
        </div>
    );
}

export default Controlls;