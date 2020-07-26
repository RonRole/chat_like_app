import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Overlap from '../style-components/Overlap'
import UserImage from './UserImage'
import styled from 'styled-components'

const StyledUserImage = styled(UserImage)`
    opacity:${props=>props.opacity};
    transition: opacity 0.5s ease
`

const CurrentUserStatusThumb = ({
    talkRoomId,
    height,
    width,
    userId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const thisRoomStatus = currentRoomStatus[talkRoomId] || currentRoomStatus.default
    const currentUserStatus = thisRoomStatus.currentUserStatus[userId]
    
    const [userHasStatus, setUserStatus] = useState(false)
    useEffect(() => {
        setUserStatus(currentUserStatus)
    }, [currentUserStatus])
    
    return (
        <Overlap height={height} width={width} alignItems='start' justifyContent='start'>
            <Overlap.Item zIndex={0}>
                <StyledUserImage height={height} width={width} userId={userId} opacity={userHasStatus ? '0.2' : ''} thumb roundedCircle/>
            </Overlap.Item>
            <Overlap.Item zIndex={1}>
                <i className='material-icons'>{currentUserStatus}</i>
            </Overlap.Item>
        </Overlap>  
    )
} 

export default CurrentUserStatusThumb