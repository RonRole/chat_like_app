import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule';
import MessageImageList from './MessageImageList';

const SendMessageImageField = ({
    talkRoomId
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const dispatch = useDispatch()
    return (
        <MessageImageList onClickImage={messageImage=>{
            dispatch(CurrentRoomStatusModule.actions.addMessage({
                roomId : talkRoomId,
                user : loginUser,
                messageType : 'image',
                messageClass : 'messageImage',
                text:messageImage.src.profile.url,
                largeImageSrc:messageImage.src.url
            }))
            dispatch(CurrentRoomStatusModule.actions.sendMessage({
                roomId : talkRoomId,
                user : loginUser,
                messageType : 'image',
                messageClass : 'receiveMessageImage',
                text:messageImage.src.profile.url,
                largeImageSrc:messageImage.src.url
            }))
        }}/>
    )
}

export default SendMessageImageField