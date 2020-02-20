//reducer
const initialState = {
    talkRooms:{},
}
export const getTalkRoomIds = (state) => Object.keys(state.talkRooms)

export const talkRoomReducer = (state = initialState, action) => {
    switch(action.type) {
        case TalkRoomActionTypes.INITIALIZE_TALK_ROOMS: {
            action.talkRooms.forEach(room => {
                state.talkRooms[room.id] = room
            });
            return {
                ...state,
           }
        }
        case TalkRoomActionTypes.ADD_TALK_ROOM: {
            state.talkRooms[action.talkRoom.id] = action.talkRoom
            return {
                ...state
            }
        }
        case TalkRoomActionTypes.DELETE_TALK_ROOM: {
            delete state.talkRooms[action.talk_room_id]
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}
