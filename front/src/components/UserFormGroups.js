import React, { useState } from 'react'
import { Form, NavItem } from 'react-bootstrap'
import Transparent from './Transparent'

const UserFormGroups = {}

UserFormGroups.IdFormGroup = ({
    className = "",
    style = "",
    defaultValue = "",
    errorMessages = [],
    required = false
}) => {
    return (
        <Form.Group controlId="idForm" className={className} style = {{...style}}>
            <Form.Label>ユーザーID</Form.Label>
            <Form.Control type="text" name="id" placeholder="ID" isInvalid={errorMessages.length > 0} defaultValue={defaultValue} required={required}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

UserFormGroups.NameFormGroup = ({
    className = "",
    style = "",
    defaultValue = "",
    errorMessages = [],
    required = false
}) => {
    return (
        <Form.Group controlId="nameForm" className={className} style={{...style}}>
            <Form.Label>名前</Form.Label>
            <Form.Control type="text" name="name" placeholder="名前" isInvalid={errorMessages.length > 0} defaultValue={defaultValue} required={required}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

UserFormGroups.PasswordFormGroup = ({
    className = "",
    style = "",
    defaultValue = "",
    errorMessages = [],
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

UserFormGroups.PasswordConfirmationFormGroup = ({
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

const ProfileImageFormGroup = ({
    defaultValue,
    errorMessages
}) => {
    const [uploadFileImage, setUploadFileImage] = useState(defaultValue)
    const [transParentProfile, setTransParentProfile] = useState(false)

    return (
        <Form.Group controlId="signUpImageForm">
            <Form.Control className='d-none' type="file" name="image" isInvalid={errorMessages.length > 0} onChange={(e) => {
                const fileReader = new FileReader()
                const input = e.currentTarget.files[0]
                fileReader.onload = e => {
                    setUploadFileImage(e.target.result)
                }
                input ? fileReader.readAsDataURL(input) : setUploadFileImage(null)
            }}/>
            <Transparent>
                <Transparent.Front transParent={transParentProfile}>
                    <img
                        style={{
                            backgroundColor:uploadFileImage ? "white" : "",
                        }}　 
                        onClick={()=>document.getElementById("signUpImageForm").click()}
                        onMouseOver={() => setTransParentProfile(true)}
                        onMouseLeave={() => setTransParentProfile(false)}
                        className="mb-2" 
                        src={uploadFileImage} 
                        width="200px" 
                        height="200px"
                    />
                </Transparent.Front>
                <Transparent.Back>
                    <div className='d-flex align-items-center'
                        style={{
                            fontWeight:"bold", 
                            color:"gray",
                            height:'200px',
                            width:'200px',
                    }}>
                        <div className = 'w-100'>
                            プロフィール画像変更
                        </div>
                    </div>
                </Transparent.Back>
            </Transparent>

            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

ProfileImageFormGroup.defaultProps = {
    defaultValue : null,
    errorMessages : []
}

UserFormGroups.ProfileImageFormGroup = ProfileImageFormGroup

export default UserFormGroups