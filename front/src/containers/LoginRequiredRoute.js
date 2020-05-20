import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * stateのisLoggedInが設定されていない場合(=ログインがされていない場合)
 * /signinにリダイレクトするRouteコンポーネント
 */
const LoginRequiredRoute = ({
    exact,
    path,
    component
}) => {
    const logStatus = useSelector(state => state.logStatus)
    if(!logStatus.isLoggedIn){
        return  <Route exact={exact} path={path} render={()=><Redirect to={{
            pathname:"/signin",
            flash: {
                message:'ログインしてください',
                variant:'danger'
            },
        }}/>}/>
    }
    return <Route exact={exact} path={path} component={component}/>
}

export default LoginRequiredRoute
