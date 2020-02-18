import {logReducer, logSaga } from './modules/LoginModule'
import {createStore, combineReducers, applyMiddleware} from 'redux'

import { talkRoomReducer, talkRoomSaga } from './modules/TalkRoomModule'
import TalkRoomMessageModule from './modules/talkRoomMessageModule/TalkRoomMessageModule'


//saga
import createSagaMiddleware from 'redux-saga'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(
    combineReducers({
        appReducer : TalkRoomMessageModule.reducer.createMessageReducer,
        logReducer, 
        talkRoomReducer
    }), 
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(logSaga)
sagaMiddleware.run(TalkRoomMessageModule.saga)
sagaMiddleware.run(talkRoomSaga)

export default store;
