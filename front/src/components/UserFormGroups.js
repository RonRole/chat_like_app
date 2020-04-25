import React from 'react'
import { Form, NavItem } from 'react-bootstrap'

export const IdFormGroup = ({
    className = "",
    style = "",
    errorMessages = []
}) => {
    return (
        <Form.Group controlId="idForm" className={className} stayle = {{...style}}>
            <Form.Label>ユーザーID</Form.Label>
            <Form.Control type="text" name="id" placeholder="おID" isInvalid={errorMessages.length > 0}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export const NameFormGroup = ({
    className = "",
    style = "",
    errorMessages = []
}) => {
    return (
        <Form.Group controlId="nameForm" className={className} style={{...style}}>
            <Form.Label>名前</Form.Label>
            <Form.Control type="text" name="name" placeholder="名前" isInvalid={errorMessages.length > 0}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export const PasswordFormGroup = ({
    className = "",
    style = "",
    errorMessages = []
}) => {
    return (
        <Form.Group controlId="passwordForm" className={className} style={{...style}}>
            <Form.Label>パスワード</Form.Label>
            <Form.Control type="password" name="password" placeholder="パスワード" isInvalid={errorMessages.length > 0}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export const PasswordConfirmationFormGroup = ({
    className = "",
    style = "",
    errorMessages = []
}) => {
    return (
        <Form.Group controlId="passwordConfirmationForm" className={className} style={{...style}}>
            <Form.Label>パスワード確認</Form.Label>
            <Form.Control type="password" name="password_confirmation" placeholder="もう一度パスワードを入力してください" isInvalid={errorMessages.length > 0}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}


export class ProfileImageFormGroup extends React.Component {
    
    state = {
        uploadFileImage : null
    }
    
    render() {
        return(
            <Form.Group controlId="signUpImageForm">
                <Form.Control style={{display:'none'}} type="file" name="image"   isInvalid={this.props.errorMessages.length > 0} onChange={(e) => {
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
                <Form.Control.Feedback type="invalid">
                    {this.props.errorMessages.find(e=>e)}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }
}