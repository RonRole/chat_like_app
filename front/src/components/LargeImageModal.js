import React, { useState } from 'react'
import { Modal, Image } from 'react-bootstrap'

const LargeImageModal = ({
    largeImageSrc,
    onCancel,
    dialogClassName,
    ...props
}) => {
    const [width, setWidth] = useState(0)
    const largeImage = document.createElement('img')
    largeImage.onload = () => {
        setWidth(largeImage.naturalWidth)
    }
    largeImage.src = largeImageSrc
    const imageViewWidth = Math.ceil(width/window.parent.screen.width*100)
    const dialogWidth = `vw-${Math.min(80, imageViewWidth)}`
    return (
        <Modal onHide={onCancel} dialogClassName={`${dialogWidth}`} {...props} />
    )
}

export default LargeImageModal