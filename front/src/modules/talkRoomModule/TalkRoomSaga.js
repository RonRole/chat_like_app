import DataAccessor from "../DataAccessor"
import TalkRoomActions, { TalkRoomActionTypes } from "./TalkRoomActions"
import { put, take, call, all } from "redux-saga/effects"

const createTalkRoom = ({
    title,
    description,
    authorId
}) => {
    return DataAccessor.post({
        url       : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms`,
        parameter : {
            talkroom : {
                title      :title,
                description:description,
                author_id   :authorId
            }
        } 
    })
}

const getTalkRooms = () => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms` 
    })
}

const deleteTalkRoom = (talkRoomId) => {
    return DataAccessor.delete({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}`
    })
}

//saga
function* handleGetTalkRooms() {
    while(true) {
        const action = yield take(TalkRoomActionTypes.TRY_TO_INITIALIZE_TALK_ROOMS)
        const talkRoomResult = yield call(getTalkRooms)
        if(talkRoomResult.isSuccess) {
            yield put(TalkRoomActions.initializeTalkRooms(talkRoomResult.data))
        }
        if(talkRoomResult.isFail) {
            alert('トークルームを取得できませんでした')
        }
        if(talkRoomResult.isError) {
            alert(`エラーが発生しました ${talkRoomResult.data}`)
        }
    }
}

function* handleAddTalkRoom() {
    while(true) {
        const action = yield take(TalkRoomActionTypes.TRY_TO_ADD_TALK_ROOM)
        const addTalkRoomResult = yield call(createTalkRoom, {
            title       : action.title,
            description : action.description,
            authorId    : action.authorId
        })
        if(addTalkRoomResult.isSuccess) {
            yield put(TalkRoomActions.addTalkRoom(addTalkRoomResult.data))
        }
        if(addTalkRoomResult.isFail) {
            alert('トークルームを追加できませんでした')
        }
        if(addTalkRoomResult.isError) {
            alert(`エラーが発生しました ${addTalkRoomResult.data}`)
        }
    }
}

function* handleDeleteTalkRoom() {
    while(true) {
        const action = yield take(TalkRoomActionTypes.TRY_TO_DELETE_TALK_ROOM)
        const deleteTalkRoomResult = yield call(deleteTalkRoom, action.talkRoomId)
        if(deleteTalkRoomResult.isSuccess) {
            yield put(TalkRoomActions.deleteTalkRoom({
                talkRoomId : action.talkRoomId
            }))
        }
        if(deleteTalkRoomResult.isFail) {
            alert(`トークルームを削除できませんでした`)
        }
        if(deleteTalkRoomResult.isError) {
            alert(`エラーが発生しました ${deleteTalkRoomResult.data}`)
        }
    }
}

export default function* talkRoomSaga() {
    yield all([
        handleAddTalkRoom(),
        handleGetTalkRooms(),
        handleDeleteTalkRoom()
    ])
}