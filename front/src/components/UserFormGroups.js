import React from 'react'
import { Form, NavItem } from 'react-bootstrap'

export class NameFormGroup extends React.Component {
    render() {
        return (
            <Form.Group controlId="nameForm" {...this.props}>
                <Form.Label>おなまえ</Form.Label>
                <Form.Control type="text" name="name" placeholder="おなまえ" />
            </Form.Group>
        )
    }
}

export class PasswordFormGroup extends React.Component {
    render () {
        return (
            <Form.Group controlId="passwordForm" {...this.props}>
                <Form.Label>おぱすわーど</Form.Label>
                <Form.Control type="password" name="password" placeholder="おぱすわーど"/>
            </Form.Group>
        )
    }
}

export class PasswordConfirmFormGroup extends React.Component {
    render() {
        return (
            <Form.Group controlId="passwordConfirmForm" {...this.props}>
                <Form.Label>もう一度入力なさい</Form.Label>
                <Form.Control type="password" name="password_confirmation" placeholder="おぱすわーど"/>
            </Form.Group>
        )
    }
}

export class ProfileImageFormGroup extends React.Component {
    
    state = {
        uploadFileImage : null
    }
    
    render() {
        return(
            <Form.Group controlId="signUpImageForm" {...this.props}>
                <Form.Control style={{display:'none'}} type="file" name="image" onChange={(e) => {
                    const fileReader = new FileReader()
                    const input = e.currentTarget.files[0]
                    fileReader.onload = e => {
                        this.setState({
                            uploadFileImage: e.target.result
                        })

                    }
                    input ? fileReader.readAsDataURL(input) : this.setState({uploadFileImage:null})
                }}/>
                <div className="d-flex align-items-center" style={{position:"relative",width:"200px", height:"200px"}}>
                    <img
                        id="set_image" 
                        style={{
                            backgroundColor:this.state.uploadFileImage ? "white" : "",
                            position:"absolute"
                        }}　 
                        onClick={()=>document.getElementById("signUpImageForm").click()} 
                        className="mb-2" 
                        src={this.state.uploadFileImage} 
                        width="100%" 
                        height="100%"
                    />
                    <div style={{ textAlign:"center", width:"100%", fontWeight:"bold", color:"gray" }}>
                        プロフィール画像変更
                    </div>
                </div>
            </Form.Group>
        )
    }
}