import React, { Component, createContext } from 'react';
//redux
import MessagesPage from './MessagesPage'
//bootstrap
import { BrowserRouter, Route, Router, Switch, Redirect } from 'react-router-dom';

import Navigation from '../components/Navigation'
import LoginRequiredRoute from './LoginRequiredRoute';
import LoginPage from '../components/LoginPage';
import TalkRoomPage from './TalkRoomPage'
import { connect } from 'react-redux';
import Loading from './Loading';
import LogModule from '../modules/logModule/LogModule';
import HomePage from './HomePage';
import SignUpPage from '../components/SignUpPage';


export class App extends Component {

  state = {
    defaultLoaded : false
  }

  componentDidMount(){
    this.props.defaultLogin({
      history : this.props.history,
      then : () => this.setState({
        defaultLoaded : true
      })
    })
  }


  render() {
    if(!this.state.defaultLoaded) {
        return (
          <Loading />
        )
    }   
    return (
      <BrowserRouter>
        <Loading />
        <Navigation />
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignUpPage} />
          <LoginRequiredRoute exact path="/home" component={HomePage}/>
          <LoginRequiredRoute exact path="/talk_rooms" component={TalkRoomPage} />
          <LoginRequiredRoute path="/talk_rooms/:id" component={MessagesPage}/>
          <Redirect to="/home" />
        </Switch>

      </BrowserRouter>  
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:({
      history,
      then
    }) => {
      dispatch(LogModule.actions.cookieLogin({
        history,
        then
      }))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
