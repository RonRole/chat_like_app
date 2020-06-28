import React, { useState, useEffect } from "react"
import { Card, Button, Row, Dropdown, Image } from "react-bootstrap"
import {  useSelector, useDispatch } from "react-redux"
import OwnerDropdown from "./OwnerDropdown"
import { withRouter } from "react-router-dom"
import TalkRoomMembersModal from "./TalkRoomMembersModal"
import CurrentRoomStatusActions from "../modules/currentRoomStatusModule/CurrentRoomStatusActions"

const TalkRoomCard = ({
    history,
    talkRoomId,
    readOnly
}) => {
    const [showTalkRoomMemberModal, setShowTalkRoomMemberModal] = useState(false)
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    const currentRoomStatus = useSelector(state=>state.currentRoomStatus)
    const userStatus = useSelector(state=>state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(CurrentRoomStatusActions.execRefreshCurrentRoomUserIds({
            talkRoomId
        }))
    },[])
    return (
        <Card>
            <Card.Body>
                <div className="d-flex w-100">
                    <div className="mr-2 w-100 overflow-auto">
                        <Card.Title><strong>{thisRoom.title}</strong></Card.Title>
                        <Card.Text>{thisRoom.description}</Card.Text>
                    </div>
                    {(currentRoomStatus[talkRoomId] || currentRoomStatus.default).currentUserIds.map((userId,index) => (
                        <Image key={index} className='user_thumb_size' src={(userStatus[userId] || userStatus[0]).image.thumb.url}  roundedCircle/>
                    ))}
                </div>
                <div className="d-flex justify-content-end mb-2">
                    <Button size='sm' className="mr-2" onClick={()=>history.push(`/talk_rooms/${talkRoomId}`)}>入る</Button>
                    <Button size='sm' onClick={()=>setShowTalkRoomMemberModal(true)}>メンバー一覧</Button>
                </div>
                <div className="d-flex justify-content-end">
                    {[readOnly].filter(readOnly => !readOnly).map((_,index) => {
                        return (
                            <OwnerDropdown key={index} talkRoomId={talkRoomId}/>
                        )    
                    })}
                </div>
                <TalkRoomMembersModal show={showTalkRoomMemberModal} talkRoomId={talkRoomId} onCancel={() => setShowTalkRoomMemberModal(false)}/>
            </Card.Body>
        </Card>
    )
}

TalkRoomCard.defaultProps = {
    talkRoomId : 0,
    readOnly : false
}

export default withRouter(TalkRoomCard)
