import React from 'react';

import classes from './Images.module.css';
import { imagesSrc } from '../../../../shared/utility';


const Images = props => {
    const imgs = imagesSrc(props.projImgs),
        images = imgs.map((img, index) => {
            let h = - props.deltaY + (index + 1) * props.vpH;
            let o = (- props.deltaY + (index + 1) * props.vpH) * 1 / props.vpH;
            
            h = Math.max(0, h);
            h = Math.min(props.vpH, h);
            o = Math.max(0, o);
            o = Math.min(1, o);
            
            return (
                <div className={classes.Image} key={index}
                    style={{
                        background: `url('${img}') no-repeat center`,
                        height: `${h}px`,
                        opacity: o
                    }} />
            )
        });
    
    return (
        <div className={classes.Images}>
            {images}
        </div>
    )
}


export default Images;