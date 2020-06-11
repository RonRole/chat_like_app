//actionTypes
export const CurrentRoomStatusActionTypes = {
    JOIN_ROOM                   : "JOIN_ROOM",
    RECEIVE_JOIN_ROOM           : "RECEIVE_JOIN_ROOM",
    LEAVE_ROOM                  : "LEAVE_ROOM",
    RECEIVE_LEAVE_ROOM          : "RECEIVE_LEAVE_ROOM",
    DISCONNECTED_FROM_SERVER    : "DISCONNECTED_FROM_SERVER",
    ADD_MESSAGE                 : "ADD_MESSAGE",
    SEND_MESSAGE                : "SEND_MESSAGE",
    RECEIVE_MESSAGE             : "RECEIVE_MESSAGE",
    SET_CURRENT_USER_IDS        : "SET_CURRENT_USER_IDS",
    CLEAR_MESSAGE               : "CLEAR_MESSAGE",
    REFRESH_CURRENT_ROOM_USERS  : "REFRESH_CURRENT_ROOM_USERS",
    CHANGE_CURRENT_USER_STATUS  : "CHANGE_CURRENT_USER_STATUS",
    RECEIVE_CURRENT_USER_STATUS : 'RECEIVE_CURRENT_USER_STATUS'
}

//actionCreators
const joinRoom = ({
    roomId,
    messageType = 'text',
    messageClass = 'receiveMessage',
    user,
    text,
}) => {
    return {
        type   : CurrentRoomStatusActionTypes.JOIN_ROOM,
        user,
        roomId,
        messageType,
        messageClass,
        text
    }
}

const receiveJoinRoom = ({
    roomId,
    messageType = 'text',
    messageClass = 'receiveMessage',
    user,
    text,
}) => {
    return {
        type   : CurrentRoomStatusActionTypes.RECEIVE_JOIN_ROOM,
        user,
        roomId,
        messageType,
        messageClass,
        text
    }
}

const leaveRoom = ({
    roomId,
    user,
    messageType = 'text',
    messageClass = 'receiveMessage',
    text,
}) => {
    return {
        type : CurrentRoomStatusActionTypes.LEAVE_ROOM,
        user,
        roomId,
        messageType,
        messageClass,
        text,
    }
}

const receiveLeaveRoom = ({
    roomId,
    user,
    messageType = 'text',
    messageClass = 'receiveMessage',
    text,
}) => {
    return {
        type : CurrentRoomStatusActionTypes.RECEIVE_LEAVE_ROOM,
        user,
        roomId,
        messageType,
        messageClass,
        text,
    }
}

const addMessage = ({
    roomId,
    messageType = 'text',
    messageClass = 'receiveMessage',
    user,
    text,
}) => {
    return {
        type     : CurrentRoomStatusActionTypes.ADD_MESSAGE,
        roomId,
        messageClass,
        messageType,
        user,
        text
    }
}

const sendMessage = ({
    roomId,
    messageType = 'text',
    messageClass = 'receiveMessage',
    user,
    text
}) => {
    return {
        type : CurrentRoomStatusActionTypes.SEND_MESSAGE,
        roomId,
        messageClass,
        messageType,
        user,
        text
    }
}

const receiveMessage = ({
    roomId,
    user,
    messageType,
    messageClass,
    text
}) => {
    return {
        type     : CurrentRoomStatusActionTypes.RECEIVE_MESSAGE,
        roomId,
        user,
        messageType,
        messageClass,
        text
    }
}

const setCurrentUserIds = (...users) => {
    return {
        type : CurrentRoomStatusActionTypes.SET_CURRENT_USER_IDS,
        users
    }
} 

const clearMessage = (roomId) => {
    return {
        type : CurrentRoomStatusActionTypes.CLEAR_MESSAGE,
        roomId
    }
}

const refreshCurrentRoomUsers = ({
    talkRoomId,
    userIds
}) => {
    return {
        type : CurrentRoomStatusActionTypes.REFRESH_CURRENT_ROOM_USERS,
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
        type: CurrentRoomStatusActionTypes.CHANGE_CURRENT_USER_STATUS,
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
        type: CurrentRoomStatusActionTypes.RECEIVE_CURRENT_USER_STATUS,
        talkRoomId,
        userId,
        status
    }
}

export default {
    joinRoom,
    receiveJoinRoom,
    leaveRoom,
    receiveLeaveRoom,
    addMessage,
    sendMessage,
    receiveMessage,
    setCurrentUserIds,
    clearMessage,
    refreshCurrentRoomUsers,
    changeCurrentUserStatus,
    receiveCurrentUserStatus
}