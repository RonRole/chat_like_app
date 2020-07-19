import React, { useState } from "react"
import { Dropdown, Modal, ListGroup, Button } from "react-bootstrap"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import { useDispatch, useSelector } from "react-redux"
import UserInviteForm from "./UserInviteForm"
import RemoveTalkRoomMembersModal from "./RemoveTalkRoomMemberModal"

const DeleteTalkRoomItem = ({talkRoomId}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.defaultRoom
    const dispatch = useDispatch()
    return (
        <Dropdown.Item style={{color:"red"}} onClick={()=> {
            if(!window.confirm(`${thisRoom.title}を削除しますか?`)){
                return
            }
            dispatch(TalkRoomModule.actions.execDeleteTalkRoom(talkRoomId))
        }}>消す</Dropdown.Item>
    )
}

/**
 * オーナー専用のドロップダウンメニュー
 */
const OwnerDropdown = ({
    talkRoomId
}) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success">
                ルーム設定
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <DeleteTalkRoomItem talkRoomId = {talkRoomId} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default OwnerDropdown