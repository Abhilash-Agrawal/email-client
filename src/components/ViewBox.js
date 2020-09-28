import React, {useContext} from 'react';
import StoreContext from '../store/StoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useObserver } from "mobx-react";

export default function ViewBox(props){
    const store = useContext(StoreContext);

    return(
        useObserver(() => (
    
        <section className="viewBox">
            {store.selectedMail && store.selectedMail.content ? <React.Fragment>
                <div className="viewSubjectBox">
                <span className="viewSubject"><b>{store.selectedMail.subject}</b></span>
            </div>
            <div className="viewContentBox">
                <div className="viewContent" dangerouslySetInnerHTML={{__html: store.selectedMail.content}} />
            </div>
            </React.Fragment> : 
            <div className="noMailSelected">
                <FontAwesomeIcon className="mailIcon" icon={faEnvelope} size="9x" />
                Select an Item to read
            </div>}
        </section>
        ))
    )
};