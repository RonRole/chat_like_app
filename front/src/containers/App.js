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


export class App extends Component {
  state = {
    defLoginIsFinished:false
  }

  componentDidMount(){
    this.props.defaultLogin(
      {
        session:{name:"test",password:"test"},
        then: ()=> {
          this.setState({defLoginIsFinished:true})
        },
        history: this.props.history
      }
    )
  }

  render() {
    if(!this.state.defLoginIsFinished){
      return <Loading />
    }
    return (
      <BrowserRouter>
        <Navigation />
        <Route path="/login" component={LoginPage}/>
        <LoginRequiredRoute path="/home"/>
        <LoginRequiredRoute path="/about" component={AboutPage}/>
        <LoginRequiredRoute exact path="/talk_rooms" component={TalkRoomPage} />
        <LoginRequiredRoute path="/talk_rooms/:id" component={MessagesPage}/>
      </BrowserRouter>   
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:(loginInfo) => {
      dispatch(LogModule.actions.tryToLogin(loginInfo))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);
