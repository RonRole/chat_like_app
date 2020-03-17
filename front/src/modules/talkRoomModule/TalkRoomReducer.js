import { TalkRoomActionTypes } from "./TalkRoomActions";

//reducer
const initialState = {
    ownRooms : {},
    joinRooms: {},
}

const getOwnRoomIds = (state) => Object.keys(state.talkRooms.ownRooms)

const getJoinRoomIds = (state) => Object.keys(state.talkRooms.joinRooms)

const getTalkRoomById = (state) => (id) => state.talkRooms.ownRooms[id] || state.talkRooms.joinRooms[id]

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
        case TalkRoomActionTypes.ADD_USERS_TO_TALK_ROOM: {
            const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {}
            room['userIds'] = [...action.userIds]
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
    getOwnRoomIds,
    getJoinRoomIds,
    getTalkRoomById,
    createReducer
}
