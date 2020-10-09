import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Config from './component/Config';
import Back from './component/Back';
// import './App.css';
class App extends Component {
  render(){
    return ( 
      <HashRouter>
        <div className = "App"> 
          <Switch>
            <Route path='/config' component={Config}></Route>
            <Route path='/back' component={Back}></Route>
            <Redirect to='/config'/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
