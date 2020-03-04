import React from 'react'
import {connect} from 'react-redux'
import './LoginPage.css'

import { Form, Button } from 'react-bootstrap'
import LogModule from '../modules/logModule/LogModule'

export class LoginForm　extends React.Component {

    componentDidMount(){
        console.log(this.props.loginError)
    }

    render(){
        return(
            <Form onSubmit={(formEvent) => {
                                formEvent.preventDefault()
                                const input = formEvent.currentTarget
                                this.props.login({
                                    input   : input,
                                    history : this.props.history
                                })
                            }}>
                <Form.Group controlId="nameForm">
                    <Form.Label>おなまえ</Form.Label>
                    {/* isInvalidがtrueだとis-invalidクラスになる これでスタイリングする */}
                    <Form.Control isInvalid={this.props.loginError} type="text" name="name" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
                    <Form.Control.Feedback type="invalid">
                        おなまえが間違ってましてよ
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="passWordForm">
                    <Form.Label>おぱすわーど</Form.Label>
                    <Form.Control isInvalid={this.props.loginError} type="password" name="password" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
                    <Form.Control.Feedback type="invalid">
                        おぱすわーどが間違ってましてよ
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">送りますわ</Button>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginError : state.logReducer.loginError,
        isLoggedIn   : state.logReducer.isLoggedIn
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
                    history : history                
                }
            ))
        },
        logout:()=> dispatch(LogModule.actions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
