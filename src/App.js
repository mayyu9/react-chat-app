import React from 'react';
import { CometChat } from "@cometchat-pro/chat";
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {API_ID} from './config/config';
import Login from './containers/Login/Login';
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends React.Component{
  constructor(props){
    super(props);

    //initialization of Cometchat
    CometChat.init(API_ID).then(
      hasInitialized => {
        console.log("Initialization completed successfully", hasInitialized);
      },
      error => {
        console.log("Initialization failed with error:", error);
      }
    );
  }

  render(){
    let route = (
      <Switch>
        <Route  path='/dashboard' exact component={Dashboard} />
        <Route  path='/' component={Login} />
        <Redirect to="/" /> {/*this is just to redirect if any unknown path is given */}
      </Switch>
    )
    return(
      <div className='App'>
        {route}
      </div>
    )
  }
}

export default App;
