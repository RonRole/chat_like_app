import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Transparent from '../components/Transparent';
import { Image } from 'react-bootstrap';
import CurrentRoomStatusModule from '../modules/currentRoomStatusModule/CurrentRoomStatusModule';

const MessageImageSendField = ({
    match
}) => {
    const [underMouseImageId, setUnderMouseImageId] = useState(0);
    const loginUser = useSelector(state=>state.logStatus.isLoggedIn)
    const messageImages = useSelector(state=>state.messageImages)
    const dispatch = useDispatch()
    const safeMessageImages = Object.keys(messageImages).filter(key => messageImages[key] && messageImages[key].src && messageImages[key].src.thumb).map(key=>messageImages[key])
    return (
        safeMessageImages.map((messageImage,index) => (
            <Transparent key={index}>
                <Transparent.Front transParent={messageImage.id === underMouseImageId}>
                    <Image 
                        key={index} 
                        src={messageImage.src.thumb.url} 
                        onMouseOver={()=>setUnderMouseImageId(messageImage.id)}
                        onMouseLeave={()=>setUnderMouseImageId(0)}
                        onClick={() => {
                            dispatch(CurrentRoomStatusModule.actions.addMessage({
                                roomId : match.params.id,
                                user : loginUser,
                                className : 'messageImage',
                                text:messageImage.src.profile.url
                            }))
                        }}
                    />
                </Transparent.Front>
            </Transparent>
        ))
    )
}

export default withRouter(MessageImageSendField)