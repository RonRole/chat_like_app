import React from 'react'
import { Button } from 'react-bootstrap'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { useSelector, useDispatch } from 'react-redux'
import NewsActions from '../modules/newsModule/NewsActions'


const UserInviteButton = ({
    userId,
    talkRoomId,
}) => {
    const loginUser = useSelector(state=>state.logStatus.loginUser)
    const talkRooms = useSelector(state=>state.talkRooms)
    const inviteRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const dispatch = useDispatch()
    const userIsAlreadyExist = [inviteRoom.author_id, inviteRoom.user_ids].flat().some(id => id===userId)
    if(userIsAlreadyExist) {
        return <Button variant="success" disabled>すでに参加しています</Button>
    }
    return <Button variant="success" onClick={() => {
        dispatch(TalkRoomModule.actions.execAddUserToTalkRoom({
            authorId:loginUser.id,
            userId,
            talkRoomId
        }))
    }}>誘う</Button>
}

export default UserInviteButton