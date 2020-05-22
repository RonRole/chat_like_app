export const TalkRoomActionTypes = {
    EXEC_GET_OWN_ROOMS        : "GET_OWN_ROOMS",
    EXEC_GET_JOINED_ROOMS     : "GET_JOINED_ROOMS",
    EXEC_ADD_ROOM             : "EXEC_ADD_ROOM",
    EXEC_DELETE_ROOM          : "EXEC_DELETE_ROOM",
    EXEC_UPDATE_ROOM          : "EXEC_UPDATE_ROOM",
    EXEC_ADD_USER_TO_TALKROOM : "EXEC_ADD_USER_TO_TALKROOM",
    EXEC_GET_TALKROOM_AUTHOR  : "EXEC_GET_TALKROOM_AUTHOR",
    EXEC_GET_TALKROOM_MEMBERS : "EXEC_GET_TALKROOM_MEMBER",

    SET_OWN_ROOMS          : "SET_OWN_ROOMS",
    SET_JOINED_ROOMS       : "SET_JOINED_ROOMS",
    ADD_TALK_ROOM          : "ADD_TALK_ROOM",
    DELETE_TALK_ROOM       : "DELETE_TALK_ROOM",
    UPDATE_TALK_ROOM       : "UPDATE_TALK_ROOM",
    ADD_USERS_TO_TALK_ROOM : "ADD_USERS_TO_TALK_ROOM",
}

export default {
    execGetOwnRooms   :(history) => {
        return {
            type    : TalkRoomActionTypes.EXEC_GET_OWN_ROOMS,
            history : history 
        }
    },
    execGetJoinedRooms:(history) => {
        return {
            type    : TalkRoomActionTypes.EXEC_GET_JOINED_ROOMS,
            history : history
        }
    },
    execAddTalkRoom:({
        history,
        title="New Room",
        description="This is a new talk room",
        authorId
    }) => {
        return {
            type:TalkRoomActionTypes.EXEC_ADD_ROOM,
            history,
            title,
            description,
            authorId,
        }
    },
    execUpdateTalkRoom:({
        talkRoomId,
        title,
        description
    }) => {
        return {
            type : TalkRoomActionTypes.EXEC_UPDATE_ROOM,
            talkRoomId,
            title,
            description,
        }
    },
    execDeleteTalkRoom:(
        talkRoomId
    ) => {
        return {
            type      : TalkRoomActionTypes.EXEC_DELETE_ROOM,
            talkRoomId,
        }
    },

    execAddUserToTalkRoom:({
        userId,
        talkRoomId
    }) => {
        return {
            type : TalkRoomActionTypes.EXEC_ADD_USER_TO_TALKROOM,
            userId,
            talkRoomId,
        }
    },

    execGetTalkRoomAuthor: (
        talkRoomId
    ) => {
        return {
            type : TalkRoomActionTypes.EXEC_GET_TALKROOM_AUTHOR,
            talkRoomId
        }
    },

    execGetTalkRoomMembers:(
        talkRoomId
    ) => {
        return {
            type : TalkRoomActionTypes.EXEC_GET_TALKROOM_MEMBERS,
            talkRoomId,
        }
    },

    setOwnRooms   :(talkRooms) => {
        return {
            type:TalkRoomActionTypes.SET_OWN_ROOMS,
            talkRooms,
        }
    },
    setJoinedRooms:(talkRooms) => {
        return {
            type:TalkRoomActionTypes.SET_JOINED_ROOMS,
            talkRooms,
        }
    },
    addTalkRoom:(talkRoom) => {
        return {
            type:TalkRoomActionTypes.ADD_TALK_ROOM,
            talkRoom,
        }
    },
    updateTalkRoom:({
        talkRoomId,
        talkRoom
    })  => {
        return {
            type : TalkRoomActionTypes.UPDATE_TALK_ROOM,
            talkRoomId,
            talkRoom
        }
    },
    deleteTalkRoom:({
        talkRoomId
    }) => {
        return {
            type:TalkRoomActionTypes.DELETE_TALK_ROOM,
            talkRoomId,
        }
    },

    addMembersToTalkRoom : ({
        talkRoomId,
        userIds
    }) => {
        return {
            type : TalkRoomActionTypes.ADD_USERS_TO_TALK_ROOM,
            talkRoomId,
            userIds,
        }
    },
}