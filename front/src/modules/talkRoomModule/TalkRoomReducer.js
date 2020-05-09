import { TalkRoomActionTypes } from "./TalkRoomActions";
import { LogActionTypes } from "../logModule/LogActions";
import createReducerFactory from "../CreateReducerFactory";

//reducer
const initialState = {
    ownRooms : {},
    joinRooms: {},
}

const defaultRoom = {
    author_id: 0,
    created_at: '',
    description: '',
    id: 0,
    title: '',
    updated_at: '',
    userIds: []
}

const getOwnRoomIds = (state) => Object.keys(state.talkRooms.ownRooms)

const getJoinRoomIds = (state) => Object.keys(state.talkRooms.joinRooms)

const getTalkRoomById = (state) => (id) => state.talkRooms.ownRooms[id] || state.talkRooms.joinRooms[id] || defaultRoom

const actionHandler = {}
actionHandler[LogActionTypes.LOG_IN ] = () => {
    return initialState
}
actionHandler[TalkRoomActionTypes.SET_OWN_ROOMS] = (state, action) => {
    state.ownRooms = {}
    action.talkRooms.forEach(room => {
        state.ownRooms[room.id] = room
    })
    return {
        ...state,
    }
}
actionHandler[TalkRoomActionTypes.SET_JOINED_ROOMS] = (state, action) => {
    state.joinRooms = {}
    action.talkRooms.forEach(room => {
        state.joinRooms[room.id] = room
    });
    return {
        ...state,
   }
}
actionHandler[TalkRoomActionTypes.ADD_TALK_ROOM] = (state, action) => {
    state.ownRooms[action.talkRoom.id] = action.talkRoom
    return {
        ...state
    }
}
actionHandler[TalkRoomActionTypes.DELETE_TALK_ROOM] = (state, action) => {
    delete state.ownRooms[action.talkRoomId]
    return {
        ...state
    }
}
actionHandler[TalkRoomActionTypes.ADD_USERS_TO_TALK_ROOM] = (state, action) => {
    const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {userIds:[]}
    const beforeUserIds = (room['userIds'] || [])
    room['userIds'] = [...new Set([...beforeUserIds,...action.userIds])]
    return {
        ...state
    }
}

actionHandler[TalkRoomActionTypes.UPDATE_TALK_ROOM ] = (state, action) => {
    state.ownRooms[action.talkRoomId]　= {
        ...state.ownRooms[action.talkRoomId],
        ...action.talkRoom
    }
    return {
        ...state,
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    getOwnRoomIds,
    getJoinRoomIds,
    getTalkRoomById,
    createReducer
}
