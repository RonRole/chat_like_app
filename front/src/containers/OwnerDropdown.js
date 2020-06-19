import React, { useState } from "react"
import { Dropdown, Modal, ListGroup, Button } from "react-bootstrap"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import { useDispatch, useSelector } from "react-redux"
import UserInviteFormNeo from "./UserInviteFormNeo"
import RemoveTalkRoomMembersModal from "./RemoveTalkRoomMemberModal"


const UpdateTalkRoomItem = ({talkRoomId}) => {
    const [updateRoomModalShow, setUpdateRoomModalShow] = useState(false)
    return (
        <>
            <Dropdown.Item style={{color:"orange"}} onClick={()=>setUpdateRoomModalShow(true)}>作り直す</Dropdown.Item>
            <UpdateTalkRoomForm talkRoomId={talkRoomId} show = {updateRoomModalShow} onCancel = {() => {
                    setUpdateRoomModalShow(false)
                }}
            />
        </>
    )
}

const UserInviteItem = ({talkRoomId}) => {
    const [inviteUserModalShow, setUserInviteModalShow] = useState(false)
    return (
        <>
            <Dropdown.Item style={{color:"blue"}} onClick={() => setUserInviteModalShow(true)}>誘う</Dropdown.Item>
            <UserInviteFormNeo talkRoomId={talkRoomId} show = {inviteUserModalShow} onCancel = {() => {
                    setUserInviteModalShow(false)
                }}
            />
        </>
    )
}

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


const RemoveUserForm = ({talkRoomId}) => {
    const [removeUserModalShow, changeRemoveUserModalShow] = useState(false)
    return (
        <>
            <Dropdown.Item onClick={() => changeRemoveUserModalShow(true)}>
                別れる
            </Dropdown.Item>
            <RemoveTalkRoomMembersModal show={removeUserModalShow} talkRoomId={talkRoomId} onCancel={()=>changeRemoveUserModalShow(false)}/>
        </>
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
                <UserInviteItem talkRoomId = {talkRoomId}/>
                <RemoveUserForm talkRoomId = {talkRoomId} />
                <UpdateTalkRoomItem talkRoomId = {talkRoomId}/>
                <DeleteTalkRoomItem talkRoomId = {talkRoomId} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default OwnerDropdown