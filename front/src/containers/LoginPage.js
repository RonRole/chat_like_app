import React from 'react'
import {connect} from 'react-redux'
import './LoginPage.css'
import {LogActions} from '../modules/LoginModule'
import { Alert,Container, Form, FormGroup, Button } from 'react-bootstrap'

class LoginPage extends React.Component {

    state = {
        loginFailed: false
    }

    loginSuccessed = () => {
        this.setState({loginFailed:false})
                this.props.history.push("/home")
    }

    loginFailed = () => this.setState({loginFailed:true})

    render(){
        return(
            <Container>
                {this.props.location.flash ? 
                    <Alert variant="danger">{this.props.location.flash}</Alert> : ""}
                <h1>ログイン</h1>
                <Form onSubmit={(formEvent) => {
                                    formEvent.preventDefault()
                                    const input = formEvent.currentTarget
                                    this.props.login({
                                        input     : input,
                                        ifSuccess : this.loginSuccessed,   
                                        ifFail    : this.loginFailed
                                    })
                                }}>
                    <Form.Group controlId="nameForm">
                        <Form.Label>おなまえ</Form.Label>
                        {/* isInvalidがtrueだとis-invalidクラスになる これでスタイリングする */}
                        <Form.Control isInvalid={this.state.loginFailed} type="text" name="name" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
                        <Form.Control.Feedback type="invalid">
                            おなまえが間違ってましてよ
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="passWordForm">
                        <Form.Label>おぱすわーど</Form.Label>
                        <Form.Control isInvalid={this.state.loginFailed} type="password" name="password" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
                        <Form.Control.Feedback type="invalid">
                            おぱすわーどが間違ってましてよ
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type="submit">送りますわ</Button>
                </Form>
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
        login:({input, ifSuccess, ifFail}) => {
            dispatch(LogActions.login(
                {
                    session:{
                        name    : input.name.value,
                        password: input.password.value
                    },
                    ifSuccess : ifSuccess,
                    ifFail   : ifFail
                    
                }
            ))
        },
        logout:()=> dispatch(LogActions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)