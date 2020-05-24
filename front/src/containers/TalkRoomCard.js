import React, { useState } from "react"
import { Card, Button, Row, Dropdown, Image } from "react-bootstrap"
import {  useSelector } from "react-redux"
import OwnerDropdown from "./OwnerDropdown"
import { withRouter } from "react-router-dom"
import TalkRoomMembersModal from "./TalkRoomMembersModal"

const TalkRoomCard = ({
    history,
    talkRoomId,
    readOnly
}) => {
    const [showTalkRoomMemberModal, setShowTalkRoomMemberModal] = useState(false)
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.default
    const userStatus = useSelector(state=>state.users)
    
    return (
        <Card>
            <Card.Body>
                <div className="d-flex" style={{width:"100%"}}>
                    <div className="mr-2" style={{width:"100%", overflow:"auto"}}>
                        <Card.Title><strong>{thisRoom.title}</strong></Card.Title>
                        <Card.Text>{thisRoom.description}</Card.Text>
                    </div>
                    <Image style={{width:'50px', height:'50px'}} src={(userStatus[thisRoom.author_id] || userStatus[0]).image.thumb.url}  roundedCircle/>
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
