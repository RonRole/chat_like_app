import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import UserModule from '../modules/userModule/UserModule'
import { connect } from 'react-redux'
import "./SignUpForm.css"

class SignUpForm extends React.Component {

    state = {
        uploadFile : null
    }

    componentDidMount() {
        this.setState({
            uploadFile : null
        })
    }

    render() {
        return (
            <Form onSubmit={(e) => {
                e.preventDefault()
                const input=e.currentTarget
                this.props.signUp({
                    input: input,
                    image: this.state.uploadFile,
                    history : this.props.history
                })
            }}>
                <Form.Group controlId="signUpNameForm">
                    <Form.Label>おなまえ</Form.Label>
                    <Form.Control type="text" name="name" placeholder="おなまえ" />
                </Form.Group>
                <Form.Group controlId="signUpPasswordForm">
                    <Form.Label>おぱすわーど</Form.Label>
                    <Form.Control type="password" name="password" placeholder="おぱすわーど"/>
                </Form.Group>
                <Form.Group controlId="signUpPasswordConfirmForm">
                    <Form.Label>もう一度入力なさい</Form.Label>
                    <Form.Control type="password" name="password_confirmation" placeholder="おぱすわーど"/>
                </Form.Group>
                <Form.Group controlId="signUpImageForm">
                    <Form.Control style={{display:'none'}} type="file" name="image" onChange={(e) => {
                        const fileReader = new FileReader()
                        const input = e.currentTarget.files[0]
                        fileReader.onload = e => {
                            this.setState({
                                uploadFile: e.target.result
                            })

                        }
                        input ? fileReader.readAsDataURL(e.currentTarget.files[0]) : this.setState({uploadFile:null})

                    }}/>
                    <div className="d-flex align-items-center" style={{position:"relative",width:"200px", height:"200px"}}>
                        <img style={{position:"absolute"}}　 
                            onClick={()=>document.getElementsByName("image")[0].click()} 
                            className="mb-2" src={this.state.uploadFile} 
                            width="100%" 
                            height="100%"
                        />
                        <div style={{textAlign:"center", width:"100%", fontWeight:"bold"}}>
                            クリックで画像変更
                        </div>
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit">送りますわ</Button>
            </Form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp : ({
            input,
            history
        }) => {
            dispatch(UserModule.actions.execCreateUser({
                userParams: {
                    name: input.name.value,
                    password: input.password.value,
                    password_confirmation:　input.password_confirmation.value,
                    image: input.image.files[0]
                },
                history:history
            }))
        }
    }
}

export default connect(null, mapDispatchToProps)(SignUpForm)