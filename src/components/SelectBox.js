import React, { useContext } from 'react';
import MailItem from './MailItem';
import StoreContext from '../store/StoreContext';
import { useObserver } from "mobx-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

export default function SelectBox() {
    const store = useContext(StoreContext);

    return (
        useObserver(() => (
            <aside className="selectBox">
                <div className="selectBoxControl">
                    <span className="selectBoxHead selectedHead">Focused</span>
                    <span className="selectBoxHead">Others</span>
                    {store.fliterApplied ? 
                        <button className="filterButton" onClick={() => store.removeFlaggedFilter()}>Remove Filter</button> : 
                        <button className="filterButton" onClick={() => store.filterFlaggedMails()}>filter</button>}
                </div>
                <ul>
                    {store.selectedMailData.length > 0 && store.selectedMailData.map((data) => {
                        return (<li>
                            <div onClick={() => store.openMail(data)}>
                                <MailItem mailData={data} key={data.mId} className={store.selectedMail && store.selectedMail.mId === data.mId ? "selectedMail" : ""}>
                                    <div className="action">
                                        <div className="actionDiv" key="delete" onClick={(e) => store.deleteMail(data, e)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </div>
                                        <div className={store.flaggedMails.includes(data.mId) ? "flagged" : "actionDiv"} key="flag" onClick={(e) => store.flagMail(data, e)}>
                                            <FontAwesomeIcon icon={faFlag} />
                                        </div>
                                    </div>
                                </MailItem>
                            </div>
                        </li>)
                    })}
                </ul>
            </aside>
        ))
    )
};