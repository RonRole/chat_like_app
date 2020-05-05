//actionTypes
export const ActionTypes = {
    JOIN_ROOM       : "JOIN_ROOM",
    LEAVE_ROOM      : "LEAVE_ROOM",
    DISCONNECTED_FROM_SERVER : "DISCONNECTED_FROM_SERVER",
    ADD_MESSAGE     : "ADD_MESSAGE",
    RECEIVE_MESSAGE : "RECEIVE_MESSAGE",
    SET_CURRENT_USER_IDS : "SET_CURRENT_USER_IDS",
    CLEAR_MESSAGE : "CLEAR_MESSAGE",
    REFRESH_CURRENT_ROOM_USERS  : "REFRESH_CURRENT_ROOM_USERS",
    CHANGE_CURRENT_USER_STATUS : "CHANGE_CURRENT_USER_STATUS",
    RECEIVE_CURRENT_USER_STATUS : 'RECEIVE_CURRENT_USER_STATUS'
}

//actionCreators
const joinRoom = ({user, roomId}) => {
    return {
        type   : ActionTypes.JOIN_ROOM,
        user,
        roomId
    }
}

const leaveRoom = ({user, roomId}) => {
    return {
        type : ActionTypes.LEAVE_ROOM,
        user,
        roomId,
    }
}

const addMessage = ({
    roomId,
    className,
    user,
    text,
}) => {
    return {
        type     : ActionTypes.ADD_MESSAGE,
        roomId,
        className,
        user,
        text
    }
}

const receiveMessage = ({
    roomId,
    className,
    user,
    text
}) => {
    return {
        type     : ActionTypes.RECEIVE_MESSAGE,
        roomId,
        className,
        user,
        text
    }
}

const setCurrentUsers = (...users) => {
    return {
        type : ActionTypes.SET_CURRENT_USER_IDS,
        users
    }
} 

const clearMessage = (roomId) => {
    return {
        type : ActionTypes.CLEAR_MESSAGE,
        roomId
    }
}

const refreshCurrentRoomUsers = ({
    talkRoomId,
    userIds
}) => {
    return {
        type : ActionTypes.REFRESH_CURRENT_ROOM_USERS,
        talkRoomId,
        userIds
    }
}

const changeCurrentUserStatus = ({
    talkRoomId,
    userId,
    status
}) => {
    return {
        type: ActionTypes.CHANGE_CURRENT_USER_STATUS,
        talkRoomId,
        userId,
        status
    }
}

const receiveCurrentUserStatus = ({
    talkRoomId,
    userId,
    status
}) => {
    return {
        type: ActionTypes.RECEIVE_CURRENT_USER_STATUS,
        talkRoomId,
        userId,
        status
    }
}

export default {
    joinRoom,
    leaveRoom,
    addMessage,
    receiveMessage,
    setCurrentUserIds: setCurrentUsers,
    clearMessage,
    refreshCurrentRoomUsers,
    changeCurrentUserStatus,
    receiveCurrentUserStatus
}