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

const createTalkRoomById = (state) => (id) => {
    const room = state.talkRooms.ownRooms[id] || state.talkRooms.joinRooms[id] || initialState.default
    room.getAllUsers = () => [...new Set([...(room.user_ids || []), room.author_id])].map(id => UserModule.reducer.getUserById(state)(id))
    room.getAuthor = () => UserModule.reducer.getUserById(state)(room.author_id)
    room.getMembers = () => [...new Set(room.user_ids || [])].filter(id => id !== room.author_id).map(id => UserModule.reducer.getUserById(state)(id))
    return room
}

const actionHandler = {}
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
    const room = state.ownRooms[action.talkRoomId] || state.joinRooms[action.talkRoomId] || {user_ids:[]}
    const beforeuser_ids = (room['user_ids'] || [])
    room['user_ids'] = [...new Set([...beforeuser_ids,...action.user_ids])]
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
    getTalkRoomById: createTalkRoomById,
    createReducer
}
