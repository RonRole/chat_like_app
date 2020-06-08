import React from 'react'
import { Button } from 'react-bootstrap'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { useSelector, useDispatch } from 'react-redux'


const UserInviteButton = ({
    userId,
    talkRoomId,
}) => {
<<<<<<< HEAD
    const userIsAlreadyExist = [getTalkRoomById(talkRoomId).userIds, getTalkRoomById(talkRoomId).author_id].flat().some(id => id===userId)
=======
    const talkRooms = useSelector(state=>state.talkRooms)
    const inviteRoom = talkRooms.ownRooms[talkRoomId] || talkRooms.joinRooms[talkRoomId] || talkRooms.default
    const dispatch = useDispatch()
    const userIsAlreadyExist = [inviteRoom.userIds].flat().some(id => id===userId)
>>>>>>> classコンポーネントを全てfunctionコンポーネントに置き換え
    if(userIsAlreadyExist) {
        return <Button variant="success" disabled>すでに参加しています</Button>
    }
    return <Button variant="success" onClick={() => {
        dispatch(TalkRoomModule.actions.execAddUserToTalkRoom({
            userId,
            talkRoomId
        }))
    }}>誘う</Button>
}

export default UserInviteButton