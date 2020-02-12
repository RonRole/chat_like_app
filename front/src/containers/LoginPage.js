import React from 'react'
import {connect} from 'react-redux'
import './LoginPage.css'
import {LogActions} from '../modules/LoginModule'
import { Alert,Container, Form, FormGroup, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class LoginPage extends React.Component {

    render(){
        return(
            <Container>
                {this.props.location.flash ? 
                    <Alert variant="danger">{this.props.location.flash}</Alert> : ""}
                <Form onSubmit={(formEvent) => {
                                    formEvent.preventDefault()
                                    const input = formEvent.currentTarget
                                    this.props.login(input, this.props.history)
                                }}>
                    <Form.Group controlId="nameForm">
                        <Form.Label>おなまえ</Form.Label>
                        <Form.Control type="text" name="name" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
                    </Form.Group>
                    <Form.Group controlId="passWordForm">
                        <Form.Label>おぱすわーど</Form.Label>
                        <Form.Control type="password" name="password" placeholder="ぷももえんぐえげぎおんもえちょっちょっちゃっさ"/>
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
        login:(input, history) => {
            dispatch(LogActions.login(
                {
                    session  :{name:input.name.value, password:input.password.value},
                    ifSuccess:(loginInfo)=>{
                                    alert(`ようこそ!${loginInfo.name}さん!`)
                                    history.push("/home")
                                },
                    ifFail   :() => alert("ログインに失敗しました")
                }
            ))
        },
        logout:()=> dispatch(LogActions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage)