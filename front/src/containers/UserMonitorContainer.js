import React from 'react'
import { useSelector } from 'react-redux'
import { Container, ListGroup, Image } from 'react-bootstrap'
import RenderByCondition from '../components/RenderByCondition'
import { Link } from 'react-router-dom'
import FrontAddress from '../address'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const formatDate = date => {
    const pad0len2 = number => ('00' + number).slice(-2)
    const year = date.getFullYear()
    const month = pad0len2(date.getMonth()+1)
    const day = pad0len2(date.getDay())
    const hour = pad0len2(date.getHours())
    const minutes = pad0len2(date.getMinutes())
    const seconds = pad0len2(date.getSeconds())
    return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
}


const Join = ({
    talkRoom,
    user,
    action,
    date,
    ...props
}) => {
    return (
        <ListGroup.Item {...props}>
            <div>{<Image src={user.image.thumb.url} roundedCircle/>}{formatDate(date)}</div>
            <Link to={`${FrontAddress.talk_rooms}/${talkRoom.id}`}>{talkRoom.title}</Link>に{user.name}さんが参加しました
        </ListGroup.Item>
    )
}
const Leave = ({
    talkRoom,
    user,
    action,
    date,
    ...props
}) => {
    formatDate(date)
    return (
        <ListGroup.Item {...props}>
            <div>{<Image src={user.image.thumb.url} roundedCircle/>}{formatDate(date)}</div>
            <Link to={`${FrontAddress.talk_rooms}/${talkRoom.id}`}>{talkRoom.title}</Link>から{user.name}さんが退出しました
        </ListGroup.Item>
    )
}

const UserMonitorMessage = ({
    action,
    ...props
}) => {
    const messageMap = {
        join : <Join className='text-success' {...props} />,
        leave : <Leave className='text-danger' {...props} />
    }
    return messageMap[action]
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