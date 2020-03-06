import React, { Component, createContext } from 'react';
//redux
import MessagesPage from '../components/MessagesPage'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router } from 'react-router-dom';

import Navigation from '../components/Navigation'
import AboutPage from '../components/AboutPage';
import LoginRequiredRoute from './LoginRequiredRoute';
import LoginPage from '../components/LoginPage';
import TalkRoomPage from './TalkRoomPage'
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import LogModule from '../modules/logModule/LogModule';
import HomePage from '../components/HomePage';
import SignUpPage from '../components/SignUpPage';


export class App extends Component {

  componentDidMount(){
    this.props.defaultLogin({
      history : this.props.history
    })
  }

  render() {
    return (   
      <BrowserRouter>
        {[this.props.loading].filter(e=>e).map((e,index) => {
          return <Loading key={index}/>
        })}
        <Navigation />
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignUpPage} />
        <LoginRequiredRoute exact path="/home" component={HomePage}/>
        <LoginRequiredRoute path="/about" component={AboutPage}/>
        <LoginRequiredRoute exact path="/talk_rooms" component={TalkRoomPage} />
        <LoginRequiredRoute path="/talk_rooms/:id" component={MessagesPage}/>
      </BrowserRouter>  
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading : state.loadingReducer.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:({
      history
    }) => {
      dispatch(LogModule.actions.cookieLogin({
        history:history
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
