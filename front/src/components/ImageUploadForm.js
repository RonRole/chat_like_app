import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Visible from '../style-components/Visible'
import styled from 'styled-components'
import Overlap from '../style-components/Overlap'

const StyledImage = styled.img`
    padding: 1px;
    object-fit : contain;
    transition: opacity 0.1s ease;
    height:${props=>props.height};
    width:${props=>props.width};
    &:hover {
        opacity:0.5;
        transition: opacity 0.1s ease;
    }
`

const PlaceHolder = styled.div`
    color:gray;
    font-size:1.0rem;
    font-weight:bold;
`

const StyledOverlap = styled(Overlap)`
    cursor:pointer;
    transition: opacity 0.1s ease;
    border: 1px solid gray;
    &:hover {
        opacity:0.5;
        transition: opacity 0.1s ease;
    }
`

const ImageUploadFormGroup = ({
    defaultValue,
    errorMessages,
    controlId,
    width,
    height,
    placeholder,
    ...props
}) => {
    const [uploadFileImage, setUploadFileImage] = useState(defaultValue)
    const formRef = useRef(null)
    return (
        <Form.Group controlId={controlId} {...props}>
            <Visible aria-hidden='true'>
                <Form.Control ref={formRef} type="file" name="image" accept='image/*' isInvalid={errorMessages.length > 0} onChange={(e) => {
                    const fileReader = new FileReader()
                    const input = e.currentTarget.files[0]
                    fileReader.onload = e => {
                        setUploadFileImage(e.target.result)
                    }
                    input ? fileReader.readAsDataURL(input) : setUploadFileImage(null)
                }}/>
            </Visible>
            <StyledOverlap align-items='center' justify-content='center' height={height} width={width} onClick={()=>formRef.current.click()} >
                <Overlap.Item zIndex={1}>
                    <StyledImage src={uploadFileImage} height={height} width={width} />
                </Overlap.Item>
                <Overlap.Item zIndex={0}>
                    <PlaceHolder>{placeholder}</PlaceHolder>
                </Overlap.Item>
            </StyledOverlap>
            <Form.Control.Feedback type="invalid">
                {errorMessages.filter(e=>e).map(errorMessage=>(
                    <div>{errorMessage}</div>
                ))}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

ImageUploadFormGroup.defaultProps = {
    defaultValue : '',
    errorMessages : [],
    controlId : '',
    width : '10rem',
    height : '10rem',
    placeholder : '画像変更',
}
export default ImageUploadFormGroup