import React, { useState, useEffect } from "react"
import { Card, Button, Row, Dropdown, Image } from "react-bootstrap"
import {  useSelector, useDispatch } from "react-redux"
import OwnerDropdown from "./OwnerDropdown"
import { withRouter } from "react-router-dom"
import TalkRoomMembersModal from "./TalkRoomMembersModal"
import CurrentRoomStatusActions from "../modules/currentRoomStatusModule/CurrentRoomStatusActions"
import { TransitionGroup, CSSTransition } from "react-transition-group"

const TalkRoomParams = ({
    talkRoomId
}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    return (
        <div className="mr-2 w-100 overflow-auto">
            <Card.Title><strong>{thisRoom.title}</strong></Card.Title>
            <Card.Text>{thisRoom.description}</Card.Text>
        </div>
    )
}

const CurrentUserThumbs = ({
    talkRoomId
}) => {
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const userStatus = useSelector(state=>state.users)
    return (
        <TransitionGroup className='d-flex'>
            {(currentRoomStatus[talkRoomId] || currentRoomStatus.default).currentUserIds.map((userId,index) => (
                <CSSTransition key={index} classNames='fade' timeout={100}>
                    <Image className='user-thumb-size' src={(userStatus[userId] || userStatus[0]).image.thumb.url}  roundedCircle/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}
const TalkRoomInformation = ({
    talkRoomId
}) => {
    return (
        <div className="d-flex w-100">
            <TalkRoomParams talkRoomId={talkRoomId}/>
            <CurrentUserThumbs talkRoomId={talkRoomId}/>
        </div>
    )
}

const TalkRoomCardButtons = ({
    talkRoomId,
    history
}) => {
    const [showTalkRoomMemberModal, setShowTalkRoomMemberModal] = useState(false)
    return (
        <>
            <div className="d-flex justify-content-end mb-2">
                <Button size='sm' className="mr-2" onClick={()=>history.push(`/talk_rooms/${talkRoomId}`)}>入る</Button>
                <Button size='sm' onClick={()=>setShowTalkRoomMemberModal(true)}>メンバー一覧</Button>
            </div>
            <TalkRoomMembersModal show={showTalkRoomMemberModal} talkRoomId={talkRoomId} onCancel={() => setShowTalkRoomMemberModal(false)}/>
        </>
    )
}

const TalkRoomCard = ({
    history,
    talkRoomId,
    readOnly
}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CurrentRoomStatusActions.execRefreshCurrentRoomUserIds({
            talkRoomId
        }))
    },[])
    return (
        <Card>
            <Card.Body>
                <TalkRoomInformation talkRoomId={talkRoomId} />
                <TalkRoomCardButtons talkRoomId = {talkRoomId} history={history} />
                <div className="d-flex justify-content-end">
                    {[readOnly].filter(readOnly => !readOnly).map((_,index) => {
                        return (
                            <OwnerDropdown key={index} talkRoomId={talkRoomId}/>
                        )    
                    })}
                </div>
            </Card.Body>
        </Card>
    )
}

TalkRoomCard.defaultProps = {
    talkRoomId : 0,
    readOnly : false
}

export default withRouter(TalkRoomCard)
