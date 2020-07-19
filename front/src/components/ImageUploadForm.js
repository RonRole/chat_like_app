import React, { useRef, useState } from 'react'
import Transparent from './Transparent'
import { Form } from 'react-bootstrap'

const ImageUploadFormGroup = ({
    defaultValue,
    errorMessages,
    controlId,
    imgClassName,
    backClassName,
    backText = '画像変更',
    ...props
}) => {
    const [uploadFileImage, setUploadFileImage] = useState(defaultValue)
    const formRef = useRef(null)
    return (
        <Form.Group controlId={controlId} {...props}>
            <Form.Control ref={formRef} className='d-none' type="file" name="image" accept='image/*' isInvalid={errorMessages.length > 0} onChange={(e) => {
                const fileReader = new FileReader()
                const input = e.currentTarget.files[0]
                fileReader.onload = e => {
                    setUploadFileImage(e.target.result)
                }
                input ? fileReader.readAsDataURL(input) : setUploadFileImage(null)
            }}/>
            <Transparent>
                <Transparent.Front>
                    <img
                        onClick={()=>formRef.current.click()}
                        className={`${uploadFileImage ? 'bg-white' : ''} ${imgClassName}`} 
                        src={uploadFileImage} 
                    />
                </Transparent.Front>
                <Transparent.Back className={`d-flex align-items-center font-weight-bold font-color-gray ${backClassName}`}>
                    <div className = 'w-100 gray'>
                        {backText}
                    </div>
                </Transparent.Back>
            </Transparent>
            <Form.Control.Feedback type="invalid">
                {errorMessages.filter(e=>e).map(errorMessage=>(
                    <div>{errorMessage}</div>
                ))}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default ImageUploadFormGroup