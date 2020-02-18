//actionTypes
export const ActionTypes = {
    JOIN_ROOM       : "JOIN_ROOM",
    ADD_MESSAGE     : "ADD_MESSAGE",
    RECEIVE_MESSAGE : "RECEIVE_MESSAGE"
}

//actionCreators
const joinRoom = ({roomId}) => {
    return {
        type   : ActionTypes.JOIN_ROOM,
        roomId : roomId
    }
}

const addMessage = ({
    roomId,
    className,
    text
}) => {
    return {
        type     : ActionTypes.ADD_MESSAGE,
        roomId   : roomId,
        className: className,
        md       : {span:6},
        text     : text
    }
}

const receiveMessage = ({
    roomId,
    className,
    text
}) => {
    return {
        type     : ActionTypes.RECEIVE_MESSAGE,
        roomId   : roomId,
        className: className,
        me       : {span:6},
        text     : text
    }
}

export default TalkRoomMessageActions = {
    joinRoom,
    addMessage,
    receiveMessage
}