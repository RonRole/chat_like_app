import { TalkRoomActionTypes } from "./TalkRoomActions";
import { LogActionTypes } from "../logModule/LogActions";

//reducer
const initialState = {
    ownRooms : {},
    joinRooms: {},
}

const getOwnRoomIds = (state) => Object.keys(state.talkRooms.ownRooms)

const getJoinRoomIds = (state) => Object.keys(state.talkRooms.joinRooms)

const getTalkRoomById = (state) => (id) => state.talkRooms.ownRooms[id] || state.talkRooms.joinRooms[id] || {}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case LogActionTypes.LOG_IN : {
            return initialState
        }
        case TalkRoomActionTypes.SET_OWN_ROOMS: {
            state.ownRooms = {}
            action.talkRooms = action.talkRooms || []
            action.talkRooms.forEach(room => {
                state.ownRooms[room.id] = room
            })
            return {
                ...state,
            }
        }
        case TalkRoomActionTypes.SET_JOINED_ROOMS: {
            state.joinRooms = {}
            action.talkRooms = action.talkRooms || []
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
            const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {userIds:[]}
            const beforeUserIds = (room['userIds'] || [])
            room['userIds'] = [...new Set([...beforeUserIds,...action.userIds])]
            return {
                ...state
            }
        }

        case TalkRoomActionTypes.REFRESH_CURRENT_ROOM_USERS : {
            const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {userIds:[]}
            room['currentUserIds'] = [...action.userIds]
            return {
                ...state
            }
        }

        case TalkRoomActionTypes.UPDATE_TALK_ROOM : {
            state.ownRooms[action.talkRoomId]　= {
                ...state.ownRooms[action.talkRoomId],
                ...action.talkRoom
            }
            return {
                ...state,
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
