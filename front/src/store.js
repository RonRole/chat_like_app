import {logReducer, logSaga } from './modules/LoginModule'
import {messageReducer, messageSaga, Actions} from './modules/MessageModule'
import socket from './socket/SocketSettings'
import {createStore, combineReducers, applyMiddleware} from 'redux'

//saga
import createSagaMiddleware from 'redux-saga'

//middleware
const sagaMiddleware = createSagaMiddleware()

//store setting
const store = createStore(combineReducers({appReducer: messageReducer,logReducer}), applyMiddleware(sagaMiddleware))

//client-socket listening 
socket.on('return', (response) => {
    store.dispatch(Actions.receiveMessage(response.className, response.text))
})

sagaMiddleware.run(logSaga)
sagaMiddleware.run(messageSaga)

export default store;
