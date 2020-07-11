import { TalkRoomActionTypes } from "./TalkRoomActions";
import createReducerFactory from "../CreateReducerFactory";
import UserModule from "../userModule/UserModule";

//reducer
const initialState = {
    ownRooms : {},
    joinRooms: {}
}

initialState.default = {
    author_id: 0,
    created_at: '',
    description: '',
    id: 0,
    title: '',
    updated_at: '',
    user_ids: []
}

const getOwnRoomIds = (state) => Object.keys(state.talkRooms.ownRooms)

const getJoinRoomIds = (state) => Object.keys(state.talkRooms.joinRooms)

const actionHandler = {}
actionHandler[TalkRoomActionTypes.SET_OWN_ROOMS] = (state, action) => {
    const newOwnRooms = action.talkRooms.reduce((ownRooms, room) => {
        ownRooms[room.id] = room
        return ownRooms
    }, {})
    return {
        ...state,
        ownRooms : newOwnRooms
    }
}
actionHandler[TalkRoomActionTypes.SET_JOINED_ROOMS] = (state, action) => {
    const newJoinRooms = action.talkRooms.reduce((joinRooms, room) => {
        joinRooms[room.id] = room
        return joinRooms
    }, {})
    return {
        ...state,
        joinRooms : newJoinRooms
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
        ...state,
        ownRooms : {
            ...state.ownRooms
        }
    }
}
actionHandler[TalkRoomActionTypes.ADD_USERS_TO_TALK_ROOM] = (state, action) => {
    const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {user_ids:[]}
    const beforeuser_ids = (room['user_ids'] || [])
    room['user_ids'] = [...new Set([...beforeuser_ids,...action.userIds])]
    return {
        ...state
    }
}

actionHandler[TalkRoomActionTypes.REMOVE_USERS_FROM_TALKROOM] = (state, action) => {
    const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {user_ids:[]}
    const beforeUserIds = new Set(room['user_ids'] || [])
    const afterUserIds = action.userIds.reduce((beforeUserIds, userId) => {
        beforeUserIds.delete(userId)
        return beforeUserIds
    }, beforeUserIds)
    room['user_ids'] = afterUserIds
    return {
        ...state,
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
    createReducer
}
