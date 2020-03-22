import React, { Component, createContext } from 'react';
//redux
import MessagesPage from './MessagesPage'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
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
import "./CSSTransitionGroup.css"


export class App extends Component {


  componentDidMount(){
    this.props.defaultLogin({
      history : this.props.history,
    })
  }


  render() {

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

const mapStateToProps = (state) => {
  return {
    loading : state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:({
      history,
    }) => {
      dispatch(LogModule.actions.cookieLogin({
        history,
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
