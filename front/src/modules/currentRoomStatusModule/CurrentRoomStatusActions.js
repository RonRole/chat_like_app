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
    
    EXEC_REFRESH_CURRENT_ROOM_USERS : "EXEC_REFRESH_CURRENT_ROOM_USERS",
    RECEIVE_REFRESH_CURRENT_ROOM_USERS  : "RECEIVE_REFRESH_CURRENT_ROOM_USERS",

    CHANGE_CURRENT_USER_STATUS  : "CHANGE_CURRENT_USER_STATUS",
    RECEIVE_CURRENT_USER_STATUS : 'RECEIVE_CURRENT_USER_STATUS',

    SUBMIT_TEXT_MESSAGE         : "CHANGE_NOMLISH",
    CHANGE_TRANSLATION          : "CHANGE_TRANSLATION",

    CHANGE_ROOM_BGM : "CHANGE_ROOM_BGM",
    RECEIVE_CHANGE_ROOM_BGM : "RECEIVE_CHANGE_ROOM_BGM"
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
    ...others
}) => {
    return {
        type     : CurrentRoomStatusActionTypes.ADD_MESSAGE,
        roomId,
        messageClass,
        messageType,
        user,
        text,
        ...others
    }
}

const sendMessage = ({
    roomId,
    messageType = 'text',
    messageClass = 'receiveMessage',
    user,
    text,
    ...others
}) => {
    return {
        type : CurrentRoomStatusActionTypes.SEND_MESSAGE,
        roomId,
        messageClass,
        messageType,
        user,
        text,
        ...others
    }
}

const receiveMessage = ({
    roomId,
    user,
    messageType,
    messageClass,
    text,
    ...others
}) => {
    return {
        type     : CurrentRoomStatusActionTypes.RECEIVE_MESSAGE,
        roomId,
        user,
        messageType,
        messageClass,
        text,
        ...others
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

const execRefreshCurrentRoomUserIds = ({
    talkRoomId
}) => {
    return {
        type : CurrentRoomStatusActionTypes.EXEC_REFRESH_CURRENT_ROOM_USERS,
        talkRoomId
    }
}

const receiveRefreshCurrentRoomUsers = ({
    talkRoomId,
    userIds
}) => {
    return {
        type : CurrentRoomStatusActionTypes.RECEIVE_REFRESH_CURRENT_ROOM_USERS,
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

const submitTextMessage = ({
    roomId,
    user,
    text,
    translateMode
}) => {
    return {
        type     : CurrentRoomStatusActionTypes.SUBMIT_TEXT_MESSAGE,
        roomId,
        user,
        text,
        translateMode
    }
}

const changeTranslation = ({
    talkRoomId,
    translateMode
}) => {
    return {
        type : CurrentRoomStatusActionTypes.CHANGE_TRANSLATION,
        talkRoomId,
        translateMode
    }
}

const changeRoomBgm = ({
    talkRoomId,
    bgmId,
    bgmSrcUrl
}) => {
    return {
        type : CurrentRoomStatusActionTypes.CHANGE_ROOM_BGM,
        talkRoomId,
        bgmId,
        bgmSrcUrl
    }
}

const receiveChangeRoomBgm = ({
    talkRoomId,
    bgmId,
    bgmSrcUrl
}) => {
    return {
        type : CurrentRoomStatusActionTypes.RECEIVE_CHANGE_ROOM_BGM,
        talkRoomId,
        bgmId,
        bgmSrcUrl
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

    execRefreshCurrentRoomUserIds,
    receiveRefreshCurrentRoomUsers,

    changeCurrentUserStatus,
    receiveCurrentUserStatus,
    
    submitTextMessage,
    changeTranslation,

    changeRoomBgm,
    receiveChangeRoomBgm
}