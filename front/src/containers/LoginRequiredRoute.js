import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class LoginRequiredRoute extends React.Component {

    render(){
        if(!this.props.isLoggedIn){
           return  <Route path={this.props.path} render={()=><Redirect to={{
               pathname:"/login",
               flash:"ログインしろよ",
           }}/>}/>
        }
        return <Route exact={this.props.exact} path={this.props.path} component={this.props.component}/>
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.logReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(LoginRequiredRoute)