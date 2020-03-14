//actionTypes
export const ActionTypes = {
    JOIN_ROOM       : "JOIN_ROOM",
    LEAVE_ROOM      : "LEAVE_ROOM",
    ADD_MESSAGE     : "ADD_MESSAGE",
    RECEIVE_MESSAGE : "RECEIVE_MESSAGE",
    SET_CURRENT_USER_IDS : "SET_CURRENT_USER_IDS",
    CLEAR_MESSAGE : "CLEAR_MESSAGE"
}

//actionCreators
const joinRoom = ({user, roomId}) => {
    return {
        type   : ActionTypes.JOIN_ROOM,
        user: user,
        roomId : roomId
    }
}

const leaveRoom = ({user, roomId}) => {
    return {
        type : ActionTypes.LEAVE_ROOM,
        user : user,
        roomId : roomId
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
        roomId   : roomId,
        className: className,
        user     : user,
        text     : text,
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
        roomId   : roomId,
        className: className,
        user     : user,
        text     : text
    }
}

const setCurrentUserIds = (...userIds) => {
    return {
        type : ActionTypes.SET_CURRENT_USER_IDS,
        userIds : userIds
    }
} 

const clearMessage = (roomId) => {
    return {
        type : ActionTypes.CLEAR_MESSAGE,
        roomId : roomId
    }
}

export default {
    joinRoom,
    leaveRoom,
    addMessage,
    receiveMessage,
    setCurrentUserIds,
    clearMessage
}