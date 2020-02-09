import React from 'react'
import {connect} from 'react-redux'
import './LoginPage.css'
import {LogActions} from '../modules/LoginModule'
import { Alert,Container } from 'react-bootstrap'

class LoginPage extends React.Component {

    render(){
        return(
            <Container>
                {this.props.location.flash ? 
                    <Alert variant="danger">{this.props.location.flash}</Alert> : ""}
                <form action="localhost:4000/login" method="post" id="login_form">
                    <input type="text" name="loginName"/>
                    <input type="email" name="loginEmail"/>
                    <input type="submit" value="ログイン!"/>
                    <input type="button" value="test login" onClick={this.props.login}/>
                    <input type="button" value="test logout" onClick={this.props.logout}/>
                </form>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.logReducer.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login:() => dispatch(LogActions.login()),
        logout:()=> dispatch(LogActions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)