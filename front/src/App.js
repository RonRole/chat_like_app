import React, { Component } from 'react';
import './App.css';
//redux
import MessagesPage from './components/MessagesPage'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route} from 'react-router-dom';

import { Navbar, Nav, Alert} from 'react-bootstrap';
import AboutPage from './components/AboutPage';
import LoginRequiredRoute from './containers/LoginRequiredRoute';
import LoginPage from './components/LoginPage';


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">114514</Navbar.Brand>
            <Nav className="mr-auto">
              <Link className = "nav-link" to="/">Home</Link>
              <Link className = "nav-link" to="/login">Login</Link>
              <Link className = "nav-link" to="/messages">Message</Link>
              <Link className = "nav-link" to="/about">About</Link>
            </Nav>
          </Navbar>
          <Route path="/login" component={LoginPage}/>
          <LoginRequiredRoute path="/messages" component={MessagesPage} />
          <LoginRequiredRoute path="/about" component={AboutPage}/>
        </BrowserRouter>   
        
      </div>
    )
  }
}



export default App;