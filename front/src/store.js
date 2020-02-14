import {logReducer, logSaga } from './modules/LoginModule'
import {messageReducer, messageSaga, Actions} from './modules/MessageModule'
import socket from './socket/SocketSettings'
import {createStore, combineReducers, applyMiddleware} from 'redux'

//saga
import createSagaMiddleware from 'redux-saga'
import { talkRoomReducer, talkRoomSaga } from './modules/TaklRoomModule'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(combineReducers({appReducer: messageReducer,logReducer, talkRoomReducer}), applyMiddleware(sagaMiddleware))

//client-socket listening 
socket.on('return', (response) => {
    store.dispatch(Actions.receiveMessage(response.className, response.text))
})

sagaMiddleware.run(logSaga)
sagaMiddleware.run(messageSaga)
sagaMiddleware.run(talkRoomSaga)

export default store;
