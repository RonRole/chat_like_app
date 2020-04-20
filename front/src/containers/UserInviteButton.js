import React from 'react'
import { Button } from 'react-bootstrap'
import TalkRoomModule from '../modules/talkRoomModule/TalkRoomModule'
import { connect } from 'react-redux'


const UserInviteButton = ({
    userId,
    talkRoomId,
    getTalkRoomById,
    addUserToTalkRoom
}) => {
    const userIsAlreadyExist = [...getTalkRoomById(talkRoomId).userIds].some(id => id===userId)
    if(userIsAlreadyExist) {
        return <Button variant="success" disabled>すでに参加しています</Button>
    }
    return <Button variant="success" onClick={() => {
        addUserToTalkRoom({
            userId,
            talkRoomId
        })
    }}>誘う</Button>
}

const mapStateToProps = (state) => {
    return {
        getTalkRoomById : talkRoomId => TalkRoomModule.reducer.getTalkRoomById(state)(talkRoomId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUserToTalkRoom : ({
            userId,
            talkRoomId
        }) => {
            dispatch(TalkRoomModule.actions.execAddUserToTalkRoom({
                userId,
                talkRoomId
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInviteButton)