import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Transparent from '../components/Transparent';
import { Image } from 'react-bootstrap';
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule';

const SendMessageImageField = ({
    talkRoomId
}) => {
    const [underMouseImageId, setUnderMouseImageId] = useState(0);
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const messageImages = useSelector(state=>state.messageImages)
    const dispatch = useDispatch()
    const safeMessageImages = Object.keys(messageImages).filter(key => messageImages[key] && messageImages[key].src && messageImages[key].src.thumb).map(key=>messageImages[key])
    return (
        safeMessageImages.map((messageImage,index) => (
            <Image
                key={index}
                className='mr-1 pointer opacity_under_mouse'
                src={messageImage.src.thumb.url} 
                onMouseOver={()=>setUnderMouseImageId(messageImage.id)}
                onMouseLeave={()=>setUnderMouseImageId(0)}
                onClick={() => {
                    dispatch(CurrentRoomStatusModule.actions.addMessage({
                        roomId : talkRoomId,
                        user : loginUser,
                        messageType : 'image',
                        messageClass : 'messageImage',
                        text:messageImage.src.profile.url
                    }))
                    dispatch(CurrentRoomStatusModule.actions.sendMessage({
                        roomId : talkRoomId,
                        user : loginUser,
                        messageType : 'image',
                        messageClass : 'receiveMessageImage',
                        text:messageImage.src.profile.url
                    }))
                }}
            />
        ))
    )
}

export default SendMessageImageField