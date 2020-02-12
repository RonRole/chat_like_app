import React, { Component } from 'react';
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
import { Spinner } from 'react-bootstrap';


class App extends Component {
  state = {
    defLoginIsFinished:false
  }

  componentDidMount(){
    this.props.defaultLogin(
      {
        session:{name:"st",password:"test"}, 
        ifSuccess:(loginResult)=>{
          alert(`ようこそ!${loginResult.name}さん!`)
          this.setState({defLoginIsFinished:true})
        },
        ifFail:(error)=>{
          //alert("ログインできませんでした")
          this.setState({defLoginIsFinished:true})
        }
      }
    )
  }

  render() {
    if(!this.state.defLoginIsFinished){
      return (
        <div style={{height:"100vh"}} className="d-flex flex-column justify-content-center align-items-center">
          <Spinner variant="primary" animation="border"/>    
          休憩中よ...      
        </div>
        
      )
    }
    return (
      <BrowserRouter history={require("history").createBrowserHistory()}>
        <Navigation />
        <Route path="/login" component={LoginPage}/>
        <LoginRequiredRoute path="/home"/>
        <LoginRequiredRoute path="/messages" component={MessagesPage} />
        <LoginRequiredRoute path="/about" component={AboutPage}/>
      </BrowserRouter>   
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    defaultLogin:(loginInfo) => dispatch(LogActions.login(loginInfo))
  }
}

export default connect(null, mapDispatchToProps)(App);