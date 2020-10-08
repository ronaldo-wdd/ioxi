import React from 'react';

// import Aux from '../../../hoc/Auxilliary/Auxilliary';
import classes from './Contacts.module.css';
import Icon from '../../../components/UI/Icons/Icons';


const Contacts = () => {
    return (
        <div id="contacts" className={classes.Contacts}>
            <h1 className="titlePc">Contacts</h1>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.</p>
            <div className={classes.SocialMedias}>
                <Icon type="fb"/>
                <Icon type="ig"/>
                <Icon type="in"/>
            </div>
        </div>
    );
}

export default Contacts;