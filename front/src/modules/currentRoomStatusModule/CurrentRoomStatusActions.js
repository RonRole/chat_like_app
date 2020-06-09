//actionTypes
export const CurrentRoomStatusActionTypes = {
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
const joinRoom = ({user, roomId, text}) => {
    return {
        type   : CurrentRoomStatusActionTypes.JOIN_ROOM,
        user,
        roomId,
        text
    }
}

const leaveRoom = ({user, roomId, text}) => {
    return {
        type : CurrentRoomStatusActionTypes.LEAVE_ROOM,
        user,
        roomId,
        text
    }
}

const addMessage = ({
    roomId,
    className,
    user,
    text,
}) => {
    return {
        type     : CurrentRoomStatusActionTypes.ADD_MESSAGE,
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
        type     : CurrentRoomStatusActionTypes.RECEIVE_MESSAGE,
        roomId,
        className,
        user,
        text
    }
}

const setCurrentUsers = (...users) => {
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
    leaveRoom,
    addMessage,
    receiveMessage,
    setCurrentUserIds: setCurrentUsers,
    clearMessage,
    refreshCurrentRoomUsers,
    changeCurrentUserStatus,
    receiveCurrentUserStatus
}