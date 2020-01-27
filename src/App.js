import React, { Component } from 'react';
import './App.css';
//redux
import MessageButtonContainer from './containers/MessageButtonContainer';
import MessagesContainer from './containers/MessagesContainer';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './containers/Navigation';


class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <BrowserRouter>
          <Route exact path="/messages" component={MessagesContainer} />
          <Route exact path="/messages" component={MessageButtonContainer}/>
        </BrowserRouter>   
      </div>
    )
  }

  

}

export default App;