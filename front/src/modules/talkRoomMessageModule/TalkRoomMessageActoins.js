//actionTypes
export const ActionTypes = {
    JOIN_ROOM       : "JOIN_ROOM",
    LEAVE_ROOM      : "LEAVE_ROOM",
    ADD_MESSAGE     : "ADD_MESSAGE",
    RECEIVE_MESSAGE : "RECEIVE_MESSAGE"
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

export default {
    joinRoom,
    leaveRoom,
    addMessage,
    receiveMessage
}