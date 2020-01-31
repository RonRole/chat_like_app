import React from 'react'
import {connect} from 'react-redux'
import './LoginPage.css'
import {Actions} from '../modules/AppModule'
import { Alert,Container } from 'react-bootstrap'

class LoginPage extends React.Component {

    componentDidUpdate(){
        alert(`isLoggedIn?:${this.props.isLoggedIn}`)
        console.log(this.props)
    }

    render(){
        return(
            <Container>
                {this.props.location.flash ? 
                    <Alert variant="danger">{this.props.location.flash}</Alert> : ""}
                <form action="/login" method="post" id="login_form">
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
        isLoggedIn: state.isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login:() => dispatch(Actions.login()),
        logout:()=> dispatch(Actions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)