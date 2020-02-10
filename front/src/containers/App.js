import React, { Component } from 'react';
import './App.css';
//redux
import MessagesPage from '../components/MessagesPage'
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route} from 'react-router-dom';

import Navigation from './Navigation'
import AboutPage from '../components/AboutPage';
import LoginRequiredRoute from './LoginRequiredRoute';
import LoginPage from './LoginPage';
import { LogActions } from '../modules/LoginModule';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    defLoginIsFinished:false
  }

  componentDidMount(){
    this.props.defaultLogin({info:{name:"sawai",password:"sawai"}}, ()=>this.setState({defLoginIsFinished:true}))
  }

  render() {
    if(!this.state.defLoginIsFinished){
      return (
        <h1>休憩中よ</h1>
      )
    }
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

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:(info, loadFinished) => dispatch(LogActions.login(info, loadFinished))
  }
}

export default connect(null, mapDispatchToProps)(App);