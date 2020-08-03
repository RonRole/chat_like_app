import DataAccessor from "../DataAccessor"
import { call, put, take, fork } from "redux-saga/effects"
import { eventChannel } from "redux-saga"
import NewsActions from "./NewsActions"
import NewsTypes from "./NewsTypes"

export function* handleFetchReceivedNews(){
    const result = yield call(DataAccessor.get, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/news`
    })
    if(result.isSuccess) {
        yield put(NewsActions.addReceivedNews(...result.data))
    }
}

function* handleSendNews({
    newsType,
    ...action
}) {
    const {type, receiverId, ...params} = {...action}
    yield call(DataAccessor.post, {
        url:`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${receiverId}/news`,
        parameter : {
            type : newsType,
            ...params
        }
    })
}

export function* handleSendAddMemberNews({
    ...action
}) {
    const {type, authorId, talkRoomId, userIds} = {...action}
    for(const userId of userIds){
        yield fork(handleSendNews, {
            receiverId : userId,
            newsType : NewsTypes.AddMemberNews,
            add_member_news : {
                sender_id : authorId,
                talk_room_id : talkRoomId
            }
        })
    }
}

export function* handleSendRemoveMemberNews({
    ...action
}) {
    const {type, authorId, talkRoomId, userIds} = {...action}
    for(const userId of userIds) {
        yield fork(handleSendNews, {
            receiverId : userId,
            newsType : NewsTypes.RemoveMemberNews,
            remove_member_news : {
                sender_id : authorId,
                talk_room_id : talkRoomId
            }
        })
    }
}