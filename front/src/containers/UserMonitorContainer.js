import React from 'react'
import { useSelector } from 'react-redux'
import { Container, ListGroup, Image } from 'react-bootstrap'
import RenderByCondition from '../components/RenderByCondition'
import { Link } from 'react-router-dom'
import FrontAddress from '../address'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import UserImage from './UserImage'

const formatDate = date => {
    const pad0len2 = number => ('00' + number).slice(-2)
    const year = date.getFullYear()
    const month = pad0len2(date.getMonth()+1)
    const day = pad0len2(date.getDate())
    const hour = pad0len2(date.getHours())
    const minutes = pad0len2(date.getMinutes())
    const seconds = pad0len2(date.getSeconds())
    return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
}


const Join = ({
    talkRoom,
    user,
    ...props
}) => {
    return (
        <div {...props}>
            <Link to={`${FrontAddress.talk_rooms}/${talkRoom.id}`}>{talkRoom.title}</Link>
            <span className='text-success'>に{user.name}さんが参加しました</span>
        </div>
    )
}
const Leave = ({
    talkRoom,
    user,
    ...props
}) => {
    return (
        <div {...props}>
            <Link to={`${FrontAddress.talk_rooms}/${talkRoom.id}`} {...props}>{talkRoom.title}</Link>
            <span className='text-danger'>から{user.name}さんが退出しました</span>
        </div>
    )
}

const MessageHeader = ({user,date,...props}) => {
    return (
        <div {...props}>
            <UserImage height='2.5rem' width='2.5rem' userId={user.id} thumb roundedCircle/>
            {formatDate(date)}
        </div>
    )
}

const UserMonitorMessage = ({
    action,
    talkRoom,
    ...props
}) => {
    const messageMap = {
        join : (
            <>
                <MessageHeader className='text-success' {...props}/>
                <Join talkRoom={talkRoom} {...props} />
            </>
        ),
        leave : (
            <>
                <MessageHeader className='text-danger' {...props}/>
                <Leave talkRoom={talkRoom} {...props} />
            </>
        )
    }
    return(
        <ListGroup.Item>
            {messageMap[action]}
        </ListGroup.Item>
    )
}

const UserMonitorContainer = ({
    ...props
}) => {
    const userMonitorMessages = useSelector(state => state.userMonitorMessages)
    const talkRooms = useSelector(state => state.talkRooms)
    const users = useSelector(state => state.users)
    return (
        <Container {...props}>
            <TransitionGroup component={ListGroup}>
                {[userMonitorMessages].flat().map((message,index) => {
                    const talkRoom = talkRooms.ownRooms[message.talkRoomId] || talkRooms.joinRooms[message.talkRoomId] || {}
                    const user = users[message.userId] || {}
                    return (
                        <RenderByCondition key={userMonitorMessages.length-index-1} classNames='fade' timeout={100} renderCondition={talkRoom.title && user.name} WrapWith={CSSTransition} >
                            <UserMonitorMessage talkRoom={talkRoom} user={user} action={message.action} date={message.date}/>
                        </RenderByCondition>
                    )
                })}
            </TransitionGroup>
        </Container>
    )
}

export default UserMonitorContainer