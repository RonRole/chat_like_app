import {logReducer, logSaga } from './modules/LoginModule'
import {messageReducer, messageSaga, Actions} from './modules/TalkRoomMessageModule'
import socket from './socket/SocketSettings'
import {createStore, combineReducers, applyMiddleware} from 'redux'

//saga
import createSagaMiddleware from 'redux-saga'
import { talkRoomReducer, talkRoomSaga } from './modules/TalkRoomModule'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(combineReducers({appReducer: messageReducer,logReducer, talkRoomReducer}), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(logSaga)
sagaMiddleware.run(messageSaga)
sagaMiddleware.run(talkRoomSaga)

export default store;
