import React from 'react'
import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Transparent from '../components/Transparent'

const CurrentUserStatusThumb = ({
    talkRoomId,
    userId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default

    const userStatus = useSelector(state=>state.users)
    const user = userStatus[userId] || userStatus[0]

    return (
        <Transparent>
            <Transparent.Front transParent={thisRoomStatus.currentUserStatus[userId]}>
                <Image  className="mr-2 mb-2" 
                        src={user.image.thumb.url} 
                        fluid
                        roundedCircle
                />
            </Transparent.Front>
            <Transparent.Back>
                {thisRoomStatus.currentUserStatus[userId]}
            </Transparent.Back>                                        
        </Transparent>  
    )
} 

export default CurrentUserStatusThumb