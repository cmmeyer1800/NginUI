import React, { useState } from 'react';
import 'bulma/css/bulma.css';

const Notification = (props) => {
    const [isVisible, setIsVisible] = useState(true);

    const hideNotification = () => {
        setIsVisible(false);
    }

    return (
        isVisible && 
        <div className="notification is-danger" style={{position: 'fixed', bottom: '10%', width: 'auto', left: '50%', transform: 'translateX(-50%)'}}>
            <button className="delete" onClick={hideNotification}></button>
            {props.message}
        </div>
    )
}
export default Notification;