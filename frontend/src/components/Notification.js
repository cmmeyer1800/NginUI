import React, { useState, useEffect } from 'react';
import './notification.css';
import 'bulma/css/bulma.css';

const Notification = (props) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 5000); // Start fading out after 10 seconds

        // Cleanup function to clear the timeout when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const hideNotification = () => {
        setIsVisible(false);
    }

    return (
        <div className={`notification is-danger ${isVisible ? 'fade-in' : 'fade-out'}`} style={{position: 'fixed', bottom: '20%', width: 'auto', left: '50%', transform: 'translateX(-50%)'}}>
            <button className="delete" onClick={hideNotification}></button>
            {props.children}
        </div>
    )
}

export default Notification;