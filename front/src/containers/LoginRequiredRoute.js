import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

/**
 * stateのisLoggedInが設定されていない場合(=ログインがされていない場合)
 * /signinにリダイレクトするRouteコンポーネント
 */
export class LoginRequiredRoute extends React.Component {

    render(){
        if(!this.props.isLoggedIn){
            return  <Route exact={this.props.exact} path={this.props.path} render={()=><Redirect to={{
                pathname:"/signin",
                flash:"ログインしろよ",
            }}/>}/>
        }
        return <Route {...this.props}/>
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn:state.logStatus.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(LoginRequiredRoute)
