import DataAccessor from "../DataAccessor"
import TalkRoomActions, { TalkRoomActionTypes } from "./TalkRoomActions"
import { put, take, call, all, takeLatest, takeEvery } from "redux-saga/effects"
import ErrorHandler from "../ErrorHandler"

const getOwnRooms = () => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/own_talk_rooms`
    })
}

const getTalkRooms = () => {
    return DataAccessor.get({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms` 
    })
}

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

const deleteTalkRoom = (talkRoomId) => {
    return DataAccessor.delete({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/talk_rooms/${talkRoomId}`
    })
}

//saga
function* handleGetOwnRooms(action) {
    const result = yield call(getOwnRooms)
    if(result.isSuccess) {
        yield put(TalkRoomActions.setOwnRooms(result.data))
    }
    if(result.isError) {
        const errorObject = ErrorHandler({
            error   : result.data,
            history : action.history
        })
        alert(errorObject.message)
    }
}
function* handleGetJoinedTalkRooms(action) {
    const talkRoomResult = yield call(getTalkRooms)
    if(talkRoomResult.isSuccess) {
        yield put(TalkRoomActions.setJoinedRooms(talkRoomResult.data))
    }
    if(talkRoomResult.isFail) {
        alert('トークルームを取得できませんでした')
    }
    if(talkRoomResult.isError) {
        const errorObject = ErrorHandler({
            error   : talkRoomResult.data,
            history : action.history
        })
        alert(errorObject.message)
    }
}

function* handleAddTalkRoom(action) {
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
        const errorObject = ErrorHandler({
            error   : addTalkRoomResult.data,
            history : action.history
        })
        alert(errorObject.message)
    }
}

function* handleDeleteTalkRoom(action) {
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

export default function* talkRoomSaga() {
    yield all([
        takeEvery(TalkRoomActionTypes.EXEC_GET_OWN_ROOMS, handleGetOwnRooms),
        takeEvery(TalkRoomActionTypes.EXEC_GET_JOINED_ROOMS, handleGetJoinedTalkRooms),
        takeEvery(TalkRoomActionTypes.EXEC_ADD_ROOM, handleAddTalkRoom),
        takeEvery(TalkRoomActionTypes.EXEC_DELETE_ROOM, handleDeleteTalkRoom)
    ])
}