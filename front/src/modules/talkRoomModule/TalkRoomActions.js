export const TalkRoomActionTypes = {
    TRY_TO_INITIALIZE_TALK_ROOMS : "TRY_TO_INITIALIZE_TALK_ROOMS",
    INITIALIZE_TALK_ROOMS : "INITIALIZE_TALK_ROOMS",
    TRY_TO_ADD_TALK_ROOM:"TRY_TO_ADD_TALK_ROOM",
    ADD_TALK_ROOM : "ADD_TALK_ROOM",
    TRY_TO_DELETE_TALK_ROOM:"TRY_TO_DELETE_TALK_ROOM",
    DELETE_TALK_ROOM : "DELETE_TALK_ROOM"
}

export default {
    tryToInitializeTalkRooms:() => {
        return {
            type:TalkRoomActionTypes.TRY_TO_INITIALIZE_TALK_ROOMS
        }
    },
    initializeTalkRooms:(talkRooms) => {
        return {
            type:TalkRoomActionTypes.INITIALIZE_TALK_ROOMS,
            talkRooms: talkRooms
        }
    },
    tryToAddTalkRoom:({
        title="New Room",
        description="This is a new talk room",
        authorId
    }) => {
        return {
            type       :TalkRoomActionTypes.TRY_TO_ADD_TALK_ROOM,
            title      :title,
            description:description,
            authorId   :authorId
        }
    },
    
    addTalkRoom:(talkRoom) => {
        return {
            type:TalkRoomActionTypes.ADD_TALK_ROOM,
            talkRoom:talkRoom
        }
    },

    tryToDeleteTalkRoom:({
        talkRoomId
    }) => {
        return {
            type:TalkRoomActionTypes.TRY_TO_DELETE_TALK_ROOM,
            talkRoomId:talkRoomId
        }
    },

    deleteTalkRoom:({
        talkRoomId
    }) => {
        return {
            type:TalkRoomActionTypes.DELETE_TALK_ROOM,
            talkRoomId:talkRoomId
        }
    }
}