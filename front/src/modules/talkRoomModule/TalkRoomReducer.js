import { TalkRoomActionTypes } from "./TalkRoomActions";

//reducer
const initialState = {
    ownRooms : {},
    joinRooms: {},
}

export const getOwnRoomIds = (state) => Object.keys(state.ownRooms)
export const getJoinRoomIds = (state) => Object.keys(state.joinRooms)

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case TalkRoomActionTypes.SET_OWN_ROOMS: {
            state.ownRooms = {}
            action.talkRooms.forEach(room => {
                state.ownRooms[room.id] = room
            })
            return {
                ...state,
            }
        }
        case TalkRoomActionTypes.SET_JOINED_ROOMS: {
            state.joinRooms = {}
            action.talkRooms.forEach(room => {
                state.joinRooms[room.id] = room
            });
            return {
                ...state,
           }
        }
        case TalkRoomActionTypes.ADD_TALK_ROOM: {
            state.ownRooms[action.talkRoom.id] = action.talkRoom
            return {
                ...state
            }
        }
        case TalkRoomActionTypes.DELETE_TALK_ROOM: {
            delete state.ownRooms[action.talkRoomId]
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}

export default {
    getOwnRoomIds : (state) => Object.keys(state.ownRooms),
    getJoinRoomIds : (state) => Object.keys(state.joinRooms),
    createReducer
}