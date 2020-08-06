import React, { useState } from 'react'
import { Form, NavItem } from 'react-bootstrap'
import ImageUploadFormGroup from './ImageUploadForm'

const UserFormGroups = {}

UserFormGroups.IdFormGroup = ({
    defaultValue = "",
    errorMessages = [],
    required = false,
    ...props
}) => {
    return (
        <Form.Group controlId="idForm" {...props}>
            <Form.Label>ユーザーID</Form.Label>
            <Form.Control type="text" name="id" placeholder="ID" isInvalid={errorMessages.length > 0} defaultValue={defaultValue} required={required}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

UserFormGroups.NameFormGroup = ({
    defaultValue = "",
    errorMessages = [],
    required = false,
    ...props
}) => {
    return (
        <Form.Group controlId="nameForm" {...props}>
            <Form.Label>名前</Form.Label>
            <Form.Control type="text" name="name" placeholder="名前" isInvalid={errorMessages.length > 0} defaultValue={defaultValue} required={required}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

UserFormGroups.PasswordFormGroup = ({
    controlId="passwordForm",
    label="パスワード",
    defaultValue = "",
    errorMessages = [],
    ...props
}) => {
    return (
        <Form.Group controlId={controlId} {...props}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type="password" name="password" placeholder="パスワード" isInvalid={errorMessages.length > 0}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

UserFormGroups.PasswordConfirmationFormGroup = ({
    controlId = 'passwordConfirmationForm',
    defaultValue = "",
    errorMessages = [],
    ...props
}) => {
    return (
        <Form.Group controlId={controlId} {...props}>
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
    return (
        <ImageUploadFormGroup defaultValue={defaultValue} 
                              errorMessages={errorMessages} 
                              controlId='userProfileImage'
                              placeholder='プロフィール画像'
        />
    )
}

ProfileImageFormGroup.defaultProps = {
    defaultValue : null,
    errorMessages : []
}

UserFormGroups.ProfileImageFormGroup = ProfileImageFormGroup

export default UserFormGroups