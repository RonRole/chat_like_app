import React, { Component, createContext } from 'react';
//redux
import MessagesPage from './MessagesPage'
//bootstrap
import { Route, Switch, Redirect, BrowserRouter as Router, Link} from 'react-router-dom';

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
      <Router>
        <Loading />
        <Navigation>
          <Link className = "nav-link" to="/home">Home</Link>
          <Link className = "nav-link" to="/signup">Sign Up</Link>
          <Link className = "nav-link" to="/signin">Sign In</Link>
          <Link className = "nav-link" to="/talk_rooms">Talk Rooms</Link>
        </Navigation>
        <Switch>
          <Route path="/signin" component={LoginPage}/>
          <Route path="/signup" component={SignUpPage} />
          <LoginRequiredRoute exact path="/home" component={HomePage}/>
          <LoginRequiredRoute exact path="/talk_rooms" component={TalkRoomPage} />
          <LoginRequiredRoute path="/talk_rooms/:id" component={MessagesPage}/>
          <Redirect to="/home" />
        </Switch>
      </Router>  
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
