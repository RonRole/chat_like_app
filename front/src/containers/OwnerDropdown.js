import React, { useState } from "react"
import { Dropdown } from "react-bootstrap"
import TalkRoomModule from "../modules/talkRoomModule/TalkRoomModule"
import UpdateTalkRoomForm from "./UpdateTalkRoomForm"
import { connect, useDispatch, useSelector } from "react-redux"
import UserInviteFormNeo from "./UserInviteFormNeo"

/**
 * オーナー専用のドロップダウンメニュー
 */
const OwnerDropdown = ({
    talkRoomId
}) => {
    const talkRoomsStatus = useSelector(state=>state.talkRooms)
    const thisRoom = talkRoomsStatus.joinRooms[talkRoomId] || talkRoomsStatus.ownRooms[talkRoomId] || talkRoomsStatus.defaultRoom
    const dispatch = useDispatch()
    const [inviteUserModalShow, setUserInviteModalShow] = useState(false)
    const [updateRoomModalShow, setUpdateRoomModalShow] = useState(false)
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success">
                ルーム設定
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item style={{color:"blue"}} onClick={() => setUserInviteModalShow(true)}>誘う</Dropdown.Item>
                <Dropdown.Item style={{color:"orange"}} onClick={()=>setUpdateRoomModalShow(true)}>作り直す</Dropdown.Item>
                <Dropdown.Item style={{color:"red"}} onClick={()=> {
                    if(!window.confirm(`${thisRoom.title}を削除しますか?`)){
                        return
                    }
                    dispatch(TalkRoomModule.actions.execDeleteTalkRoom(talkRoomId))
                }}>消す</Dropdown.Item>
            </Dropdown.Menu>
            <UserInviteFormNeo talkRoomId={talkRoomId}
                            show = {inviteUserModalShow} 
                            onCancel = {() => {
                                setUserInviteModalShow(false)
                            }}
            />
            <UpdateTalkRoomForm talkRoomId={talkRoomId}
                                show = {updateRoomModalShow}
                                onCancel = {() => {
                                    setUpdateRoomModalShow(false)
                                }}
            />
        </Dropdown>
    )
}

export default OwnerDropdown