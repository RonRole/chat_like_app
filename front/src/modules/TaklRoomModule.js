import { put, take, all } from "redux-saga/effects"

//action type
const TalkRoomActionTypes = {
    ADD_TALK_ROOM : "ADD_TALK_ROOM",
    DELETE_TALK_ROOM : "DELETE_TALK_ROOM"
}

//action creator
export const TalkRoomActions = {
    addTalkRoom:({
        title="New Room",
        description="This is new talkroom"
    }) => {
        return {
            type:TalkRoomActionTypes.ADD_TALK_ROOM,
            title:title,
            description:description
        }
    },

    deleteTalkRoom:({
        talk_room_id
    }) => {
        return {
            type:TalkRoomActionTypes.REMOVE_TALK_ROOM,
            talk_room_id:talk_room_id
        }
    }
}

//saga
function* handleAddTalkRoom() {
    while(true) {
        const action = yield take(TalkRoomActionTypes.ADD_TALK_ROOM)
    }
}

export function* talkRoomSaga() {
    yield all([
        handleAddTalkRoom(),
    ])
}

//reducer
const initialState = {
    talkRooms:[],
}

export const talkRoomReducer = (state = initialState, action) => {
    switch(action.type) {
        case TalkRoomActionTypes.ADD_TALK_ROOM: {
            return {
                ...state,
                talkRooms: [
                    ...state.talkRooms,
                    {
                        title:action.title,
                        description:action.description
                    }
                ]
            }
        }
        default: {
            return state
        }
    }
}
