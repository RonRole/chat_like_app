import React from 'react'
import {connect} from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import LogModule from '../modules/logModule/LogModule'
import FormErrorModule from '../modules/FormErrorModule/FormErrorModule'
import { withRouter } from 'react-router-dom'
import UserFormGroups from '../components/UserFormGroups'

class LoginForm　extends React.Component {

    componentWillUnmount() {
        this.props.clearLoginError()
    }
    
    render(){

        return(
            <Form onSubmit={(formEvent) => {
                                formEvent.preventDefault()
                                const input = formEvent.currentTarget
                                this.props.login({
                                    input,
                                    history : this.props.history
                                })
                            }}>
                <UserFormGroups.NameFormGroup errorMessages={this.props.loginErrorMessages} />
                <UserFormGroups.PasswordFormGroup errorMessages={this.props.loginErrorMessages} />
                <Button variant="primary" type="submit">ログイン</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state,
        loginErrorMessages : FormErrorModule.reducer.getErrorsOf(state)("loginForm")("messages")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login:({
            input,
            history
        }) => {
            dispatch(LogModule.actions.execLogin(
                {
                    session:{
                        name    : input.name.value,
                        password: input.password.value
                    },
                    history               
                }
            ))
        },
        logout:()=> dispatch(LogModule.actions.logout()),
        clearLoginError : () => {
            dispatch(FormErrorModule.actions.clearErrorByName("loginForm"))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoginForm))
