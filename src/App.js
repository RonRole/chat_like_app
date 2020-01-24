import React, { Component } from 'react';
import './App.css';
//redux
import MessageButtonContainer from './containers/MessageButtonContainer';
import MessagesContainer from './containers/MessagesContainer';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


class App extends Component {

  render() {
    return (
      <Container>
        <MessageButtonContainer />
        <MessagesContainer />
      </Container>
    )
  }

  

}

export default App;