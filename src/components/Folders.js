import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import StoreContext from '../store/StoreContext';

import { useObserver } from "mobx-react";
export default function Folders() {
    const store = useContext(StoreContext);
    return (
        useObserver(() => (
            <nav className="folder">
                <span className="folderHead">Folders</span>
                <ul>
                    <Link className="folderLink" to="/inbox">
                        <li className={store.selectedFolder === 'inbox' ? "selectedFolder" : ""}>
                            <span className="folderName">Inbox</span>
                            <span className={store.unreadCount.inbox > 0 ? "folderCount" : "hideCount"}>{store.unreadCount.inbox}</span>
                        </li>
                    </Link>
                    <Link className="folderLink" to="/Spam">
                        <li className={store.selectedFolder === 'spam' ? "selectedFolder" : ""}>
                            <span className="folderName">Spam</span>
                            <span className={store.unreadCount.spam > 0 ? "folderCount" : "hideCount"}>{store.unreadCount.spam}</span>
                        </li>
                    </Link>
                    <Link className="folderLink" to="/delete-folder">
                        <li className={store.selectedFolder === 'delete' ? "selectedFolder" : ""}>
                            <span className="folderName">Delete Folder</span>
                            <span className={store.unreadCount.delete > 0 ? "folderCount" : "hideCount"}>{store.unreadCount.delete}</span>
                        </li>
                    </Link>
                    <Link className="folderLink" to="/custom-folder">
                        <li className={store.selectedFolder === 'custom' ? "selectedFolder" : ""}>
                            <span className="folderName">Custom Folder</span>
                            <span className={store.unreadCount.custom > 0 ? "folderCount" : "hideCount"}>{store.unreadCount.custom}</span>
                        </li>
                    </Link>
                </ul>
            </nav>
        ))
    )
};