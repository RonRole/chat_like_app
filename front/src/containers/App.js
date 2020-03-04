import React, { Component } from 'react';
//redux
import MessagesPage from '../components/MessagesPage'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

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
  state = {
    defLoginIsFinished:false
  }

  componentDidMount(){
    this.props.defaultLogin({
      history : this.props.history,
      then    : () => {
        this.setState({
          defLoginIsFinished : true
        })
      }
    })
  }

  render() {
    if(!this.state.defLoginIsFinished){
      return <Loading />
    }
    return (
      <BrowserRouter>
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

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:({
      history,
      then
    }) => {
      dispatch(LogModule.actions.cookieLogin({
        history:history,
        then:then
      }))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
