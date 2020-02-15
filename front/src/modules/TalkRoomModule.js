import { put, take, all, call } from "redux-saga/effects"
import Axios from "axios"

//action type
const TalkRoomActionTypes = {
    TRY_TO_INITIALIZE_TALK_ROOMS : "TRY_TO_INITIALIZE_TALK_ROOMS",
    INITIALIZE_TALK_ROOMS : "INITIALIZE_TALK_ROOMS",
    TRY_TO_ADD_TALK_ROOM:"TRY_TO_ADD_TALK_ROOM",
    ADD_TALK_ROOM : "ADD_TALK_ROOM",
    TRY_TO_DELETE_TALK_ROOM:"TRY_TO_DELETE_TALK_ROOM",
    DELETE_TALK_ROOM : "DELETE_TALK_ROOM"
}

//action creator
export const TalkRoomActions = {
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
        description="This is a new talk room"
    }) => {
        return {
            type:TalkRoomActionTypes.TRY_TO_ADD_TALK_ROOM,
            title:title,
            description:description
        }
    },
    
    addTalkRoom:(talkRoom) => {
        return {
            type:TalkRoomActionTypes.ADD_TALK_ROOM,
            talkRoom:talkRoom
        }
    },

    tryToDeleteTalkRoom:({
        talk_room_id
    }) => {
        return {
            type:TalkRoomActionTypes.TRY_TO_DELETE_TALK_ROOM,
            talk_room_id:talk_room_id
        }
    },

    deleteTalkRoom:({
        talk_room_id
    }) => {
        return {
            type:TalkRoomActionTypes.DELETE_TALK_ROOM,
            talk_room_id:talk_room_id
        }
    }
}

const createTalkRoom = ({title,description}) => {

    return Axios.post('http://localhost:4000/talk_rooms', {talkroom:{title:title,description:description}})
                .then(response => {
                    return {connected:true, response:response}
                })
                .catch(error => {
                    return {connected:false, response:error}
                })
}

const getAllTalkRooms = () => {
    return Axios.get('http://localhost:4000/talk_rooms')
                .then(response => {
                    return {connected:true, response:response}
                })
                .catch(error => {
                    return {connected:false, response:error}
                })
}

const deleteTalkRoom = (talk_room_id) => {
    return Axios.delete(`http://localhost:4000/talk_rooms/${talk_room_id}`)
                .then(response => {
                    return {connected:true, response:response}
                })
                .catch(error => {
                    return {connected:false, response:error}
                })
} 

//saga
function* handleGetTalkRooms() {
    while(true) {
        yield take(TalkRoomActionTypes.TRY_TO_INITIALIZE_TALK_ROOMS)
        const talkRoomsResult = yield call(getAllTalkRooms)
        if(!talkRoomsResult.connected) {
            alert(talkRoomsResult.response)
            yield put(TalkRoomActions.initializeTalkRooms([]))
        }
        else {
            yield put(TalkRoomActions.initializeTalkRooms(talkRoomsResult.response.data))
        }
    }
}

function* handleAddTalkRoom() {
    while(true) {
        const action = yield take(TalkRoomActionTypes.TRY_TO_ADD_TALK_ROOM)
        const addTalkRoomResult = yield call(createTalkRoom,{title:action.title, description:action.description})
        if(!addTalkRoomResult.connected){
            alert(addTalkRoomResult.response)
            yield put({type:""})
        }
        else {
            yield put(TalkRoomActions.addTalkRoom(addTalkRoomResult.response.data))
        }
    }
}

function* handleDeleteTalkRoom() {
    while(true) {
        const action = yield take(TalkRoomActionTypes.TRY_TO_DELETE_TALK_ROOM)
        const deleteTalkRoomResult = yield call(deleteTalkRoom, action.talk_room_id)
        if(!deleteTalkRoomResult.connected) {
            alert(deleteTalkRoomResult.response)
            yield put({type:""})
        }
        else {
            yield put(TalkRoomActions.deleteTalkRoom(action.talk_room_id))
        }
    }
}

export function* talkRoomSaga() {
    yield all([
        handleAddTalkRoom(),
        handleGetTalkRooms(),
        handleDeleteTalkRoom()
    ])
}

//reducer
const initialState = {
    talkRooms:[],
}

export const talkRoomReducer = (state = initialState, action) => {
    switch(action.type) {
        case TalkRoomActionTypes.INITIALIZE_TALK_ROOMS: {
           return {
            ...state,
            talkRooms: action.talkRooms
           }
        }
        case TalkRoomActionTypes.ADD_TALK_ROOM: {
            return {
                ...state,
                talkRooms: [
                    ...state.talkRooms,
                    action.talkRoom
                ]
            }
        }
        case TalkRoomActionTypes.DELETE_TALK_ROOM: {
            return {
                ...state,
                talkRooms: [
                    ...state.talkRooms.filter(talkRoom => 
                        talkRoom.id === action.talk_room_id
                    )
                ]
            }
        }
        default: {
            return state
        }
    }
}
