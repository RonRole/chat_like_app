import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

export class LoginRequiredRoute extends React.Component {

    render(){
        if(!this.props.isLoggedIn){
            return  <Route exact={this.props.exact} path={this.props.path} render={()=><Redirect to={{
                pathname:"/login",
                flash:"ログインしろよ",
            }}/>}/>
        }
        return <Route {...this.props}/>
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.logReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(LoginRequiredRoute)
