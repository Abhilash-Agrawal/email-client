import React, { useContext } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import Folders from './components/Folders';
import MailBox from './components/MailBox';
import './App.css';
import { Switch, withRouter, Route } from "react-router-dom";

import StoreContext from './store/StoreContext';
import { useObserver } from "mobx-react";

function App() {
  const store = useContext(StoreContext);

  const renderInboxData = () => {
    store.setFolder('inbox');
    return (<MailBox></MailBox>)
  }

  const renderSpamData = () => {
    store.setFolder('spam');
    return (<MailBox></MailBox>)
  }
  const renderDeleteData = () => {
    store.setFolder('delete');
    return (<MailBox></MailBox>)
  }
  const renderCustomFolderData = () => {
    store.setFolder('custom');
    return (<MailBox></MailBox>)
  }

  const fetchFolder = () => {
    return (
      <div id="wrapper">
        <Switch>
          <Route
            path="/inbox"
            render={renderInboxData}
          />
          <Route
            path="/spam"
            render={renderSpamData}
          />
          <Route
            path="/delete-folder"
            render={renderDeleteData}
          />
          <Route
            path="/custom-folder"
            render={renderCustomFolderData}
          />
          <Route
            path="/"
            render={renderInboxData}
          />
        </Switch>
      </div>
    )
  }


  return (

    useObserver(() => (
      <div className="">
        <Header></Header>
        <Controls></Controls>
        <Folders></Folders>
        
        {fetchFolder()}
      </div>
    ))
  );
}

export default withRouter(App);
