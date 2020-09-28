import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh } from '@fortawesome/free-solid-svg-icons'

export default function Header(){
    return(
        <header className="header">
            <span className="logo"> 
                <FontAwesomeIcon className="logoIcon" icon={faTh} />
            </span>
            <span className="titleHead">
                Outlook Mail
            </span>
        </header>
    )
};