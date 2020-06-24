export const UserPositionActionTypes = {
    CHANGE_CURRENT_USER_POSITION: "CHANGE_CURRENT_USER_POSITION",
    RECEIVE_CURRENT_USER_POSITION:"RECEIVE_CURRENT_USER_POSITION",
}


const changeCurrentUserPosition = ({
    talkRoomId,
    userId,
    position
}) => {
    return {
        type: UserPositionActionTypes.CHANGE_CURRENT_USER_POSITION,
        talkRoomId,
        userId,
        position
    }
}

const receiveChangeCurrentUserPosition = ({
    talkRoomId,
    userId,
    position
}) => {
    return {
        type: UserPositionActionTypes.RECEIVE_CURRENT_USER_POSITION,
        talkRoomId,
        userId,
        position
    }
}

export default {
    changeCurrentUserPosition,
    receiveChangeCurrentUserPosition
}