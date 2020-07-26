import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'
import Size from '../style-components/Size'
import OpacityIterate from '../style-components/OpacityIterate'
import styled from 'styled-components'

const ImageListWrapper = styled.div`
    display:flex;
`

const ImageThumb = styled.img`
    height: 3.0rem;
    width: 3.0rem;
    object-fit: contain;
    border: 1px solid gray;
`


const MessageImageList = ({
    onClickImage,
    ...props
}) => {
    const messageImages = useSelector(state=>state.messageImages)
    const safeMessageImages = Object.values(messageImages).filter(messageImage => (
        messageImage &&
        messageImage.src &&
        messageImage.src.thumb
    ))
    return (
        <ImageListWrapper {...props}>
            {safeMessageImages.map((messageImage,index) => (
                <OpacityIterate key={index}>
                    <ImageThumb src={messageImage.src.thumb.url} className='mr-1' onClick={()=>onClickImage(messageImage)} />            
                </OpacityIterate>
            ))}
        </ImageListWrapper>
    )
}

MessageImageList.defaultProps = {
    onClickImage : (messageImage) => console.log(messageImage)
}

export default MessageImageList