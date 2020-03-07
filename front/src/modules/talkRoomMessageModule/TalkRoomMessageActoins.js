//actionTypes
export const ActionTypes = {
    JOIN_ROOM       : "JOIN_ROOM",
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

const addMessage = ({
    roomId,
    className,
    text,
    thumb
}) => {
    return {
        type     : ActionTypes.ADD_MESSAGE,
        roomId   : roomId,
        className: className,
        md       : {span:6, offset:6},
        text     : text,
        thumb    : thumb
    }
}

const receiveMessage = ({
    roomId,
    className,
    text,
    thumb
}) => {
    return {
        type     : ActionTypes.RECEIVE_MESSAGE,
        roomId   : roomId,
        className: className,
        md       : {span:6},
        text     : text,
        thumb    : thumb
    }
}

export default {
    joinRoom,
    addMessage,
    receiveMessage
}