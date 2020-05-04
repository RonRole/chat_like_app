import React from 'react'
import { Form, NavItem } from 'react-bootstrap'
import Transparent from './Transparent'

export const IdFormGroup = ({
    className = "",
    style = "",
    defaultValue = "",
    errorMessages = []
}) => {
    return (
        <Form.Group controlId="idForm" className={className} style = {{...style}}>
            <Form.Label>ユーザーID</Form.Label>
            <Form.Control type="text" name="id" placeholder="ID" isInvalid={errorMessages.length > 0} defaultValue={defaultValue}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export const NameFormGroup = ({
    className = "",
    style = "",
    defaultValue = "",
    errorMessages = []
}) => {
    return (
        <Form.Group controlId="nameForm" className={className} style={{...style}}>
            <Form.Label>名前</Form.Label>
            <Form.Control type="text" name="name" placeholder="名前" isInvalid={errorMessages.length > 0} defaultValue={defaultValue}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export const PasswordFormGroup = ({
    className = "",
    style = "",
    defaultValue = "",
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
    defaultValue = "",
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
        uploadFileImage : this.props.defaultValue,
        transParentProfile : false
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
                <Transparent
                    frontComponent = {
                        <img
                            style={{
                                backgroundColor:this.state.uploadFileImage ? "white" : "",
                            }}　 
                            onClick={()=>document.getElementById("signUpImageForm").click()}
                            onMouseOver={() => this.setState({transParentProfile : true})}
                            onMouseLeave={() => this.setState({transParentProfile: false})}
                            className="mb-2" 
                            src={this.state.uploadFileImage} 
                            width="200px" 
                            height="200px"
                        />
                    }
                    backComponent = {
                        <div style={{
                                fontWeight:"bold", 
                                color:"gray",
                                width:'200px'
                        }}>
                            プロフィール画像変更
                        </div>
                    }
                    transParent = {this.state.transParentProfile}
                />
                <Form.Control.Feedback type="invalid">
                    {this.props.errorMessages.find(e=>e)}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }
}