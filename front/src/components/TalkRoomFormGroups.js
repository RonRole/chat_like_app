import React from 'react'
import { Form } from 'react-bootstrap'
import ImageUploadFormGroup from './ImageUploadForm'


const TitleFormGroup = ({
    errorMessages = [],
    defaultValue="",
    ...props
}) => {
    return  (       
        <Form.Group controlId="titleForm" {...props}>
            <Form.Label>タイトル</Form.Label>
            <Form.Control type="text" name="title" placeholder="タイトル" isInvalid={errorMessages.length > 0} defaultValue={defaultValue}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

const DescriptionFormGroup = ({
    errorMessages = [],
    defaultValue="",
    ...props
}) => {
    return (
        <Form.Group controlId="descriptionForm" {...props}>
            <Form.Label>説明</Form.Label>
            <Form.Control type="text" name="description" placeholder="説明" isInvalid={errorMessages.length > 0} defaultValue={defaultValue}/>
            <Form.Control.Feedback type="invalid">
                {errorMessages}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

const ImageFormGroup = ({
    defaultValue,
    errorMessages = [],
}) => {
    return (
        <ImageUploadFormGroup defaultValue={defaultValue} 
                        errorMessages={errorMessages}
                        controlId='talkRoomImageForm'
                        imgClassName='w-px-200 h-px-150 contain opacity-under-mouse'
                        backClassName='w-px-200 h-px-150'
        />
    )
}

const TalkRoomFormGroups = {}
TalkRoomFormGroups.Title = TitleFormGroup
TalkRoomFormGroups.Description = DescriptionFormGroup
TalkRoomFormGroups.Image = ImageFormGroup

export default TalkRoomFormGroups