import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export default function Controls(){
    return(
        <nav className="controls">
            <span className="search">
                Search Mail <FontAwesomeIcon className="searchIcon" icon={faSearch} />
            </span>
            <span className="refresh">
                <button title="Please click on this to clear cache" onClick={() => {localStorage.clear()}}>Clear Cache</button>
            </span>
            
        </nav>
    )
};