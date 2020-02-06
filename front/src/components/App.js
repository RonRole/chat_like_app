import React, { Component } from 'react';
import './App.css';
//redux
import MessagesPage from './MessagesPage'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route} from 'react-router-dom';

import Navigation from '../containers/Navigation'
import AboutPage from './AboutPage';
import LoginRequiredRoute from '../containers/LoginRequiredRoute';
import LoginPage from '../containers/LoginPage';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Route path="/login" component={LoginPage}/>
        <LoginRequiredRoute path="/messages" component={MessagesPage} />
        <LoginRequiredRoute path="/about" component={AboutPage}/>
      </BrowserRouter>   
    )
  }
}


export default App;