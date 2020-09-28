import React from 'react';
import { useObserver } from "mobx-react";

export default function MailItem(props){
    return(
        
        useObserver(() => (
        <div className={ props.mailData.unread ? `${props.className} mailItemUnread mailItem`: `${props.className} mailItem`}>
            <span className="mailItemSender">{props.mailData.sender}</span>
            <span className="mailItemButton">{props.children}</span>
            <span className="mailItemSubject">{props.mailData.subject}</span>
            <span className="mailItemContent">{props.mailData.content}</span>
        </div>
        ))
    )
};