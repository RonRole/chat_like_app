import React from 'react'
import { Form, NavItem } from 'react-bootstrap'

export const TitleFormGroup = ({
    className = "",
    style = "",
    errorMessages = [],
    defaultValue=""
}) => {
    return  (       
        <Form.Group controlId="titleForm" className={className} style={{...style}}>
            <Form.Label>タイトル</Form.Label>
            <Form.Control type="text" name="title" placeholder="タイトル" isInvalid={errorMessages.length > 0} defaultValue={defaultValue}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export const DescriptionFormGroup = ({
    className = "",
    style = "",
    errorMessages = [],
    defaultValue=""

}) => {
    return (
        <Form.Group controlId="descriptionForm" className={className} style={{...style}}>
            <Form.Label>説明</Form.Label>
            <Form.Control type="text" name="description" placeholder="説明" isInvalid={errorMessages.length > 0} defaultValue={defaultValue}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages.find(e=>e)}
            </Form.Control.Feedback>
        </Form.Group>
    )
}