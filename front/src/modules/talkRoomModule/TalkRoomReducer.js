import { TalkRoomActionTypes } from "./TalkRoomActions";
import createReducerFactory from "../CreateReducerFactory";
import { LogActionTypes } from "../logModule/LogActions";

//reducer
const initialState = {
    searchText : {
        own : '',
        join : ''
    },
    ownRooms : {},
    joinRooms: {},
}

initialState.default = {
    author_id: 0,
    created_at: '',
    description: '',
    id: 0,
    title: '',
    updated_at: '',
    user_ids: [],
    image: {
        url : `${process.env.PUBLIC_URL}/pictures/default_talkroom.png`
    }
}

const actionHandler = {}

actionHandler[LogActionTypes.LOG_IN] = (state, action) => {
    return {
        ...state,
        searchText : {
            ...initialState.searchText
        }
    }
}

actionHandler[TalkRoomActionTypes.SET_OWN_ROOMS] = (state, action) => {
    const newOwnRooms = action.talkRooms.reduce((ownRooms, room) => {
        ownRooms[room.id] = room
        ownRooms[room.id].image.url = ownRooms[room.id].image.url || initialState.default.image.url
        console.log(ownRooms[room.id].image)
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
        joinRooms[room.id].image.url = joinRooms[room.id].image.url || initialState.default.image.url
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
    const {type, talkRoomId, ...params} = {...action}
    state.ownRooms[action.talkRoomId]　= {
        ...state.ownRooms[talkRoomId],
        ...params
    }
    return {
        ...state,
    }
}

actionHandler[TalkRoomActionTypes.SET_OWNROOM_SEARCH_TEXT] = (state, action) => {
    const {text} = {...action}
    return {
        ...state,
        searchText : {
            ...state.searchText,
            own : text
        }
    }
}

actionHandler[TalkRoomActionTypes.SET_JOINROOM_SEARCH_TEXT] = (state, action) => {
    const {text} = {...action}
    return {
        ...state,
        searchText : {
            ...state.searchText,
            join : text
        }
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}
