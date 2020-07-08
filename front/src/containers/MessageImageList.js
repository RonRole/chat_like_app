import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from 'react-bootstrap'

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
        <div {...props}>
            {safeMessageImages.map((messageImage,index) => (
                <Image
                    key={index}
                    className='mr-1 pointer opacity-under-mouse user-thumb-size'
                    src={messageImage.src.thumb.url} 
                    onClick={()=>onClickImage(messageImage)}
                />
            ))}
        </div>
    )
}

MessageImageList.defaultProps = {
    onClickImage : (messageImage) => console.log(messageImage)
}

export default MessageImageList