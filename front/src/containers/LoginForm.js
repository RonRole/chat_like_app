import React from 'react'
import {connect} from 'react-redux'
import './LoginPage.css'
import {LogActions} from '../modules/LoginModule'
import { Form, Button } from 'react-bootstrap'

export class LoginForm　extends React.Component {

    render(){
        return(
            <Form onSubmit={(formEvent) => {
                                formEvent.preventDefault()
                                const input = formEvent.currentTarget
                                this.props.login({
                                    input     : input,
                                    ifSuccess : ()=>this.props.history.push("/home")  
                                })
                            }}>
                <Form.Group controlId="nameForm">
                    <Form.Label>おなまえ</Form.Label>
                    {/* isInvalidがtrueだとis-invalidクラスになる これでスタイリングする */}
                    <Form.Control isInvalid={this.props.tryedToLogin && !this.props.isLoggedIn} type="text" name="name" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
                    <Form.Control.Feedback type="invalid">
                        おなまえが間違ってましてよ
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="passWordForm">
                    <Form.Label>おぱすわーど</Form.Label>
                    <Form.Control isInvalid={this.props.tryedToLogin && !this.props.isLoggedIn} type="password" name="password" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
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
        tryedToLogin : state.logReducer.tryedToLogin,
        isLoggedIn   : state.logReducer.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login:({input, ifSuccess}) => {
            dispatch(LogActions.tryToLogin(
                {
                    session:{
                        name    : input.name.value,
                        password: input.password.value
                    },
                    ifSuccess : ifSuccess,                    
                }
            ))
        },
        logout:()=> dispatch(LogActions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)
