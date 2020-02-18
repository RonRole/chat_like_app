
import {createStore, combineReducers, applyMiddleware} from 'redux'

import { talkRoomReducer, talkRoomSaga } from './modules/TalkRoomModule'
import TalkRoomMessageModule from './modules/talkRoomMessageModule/TalkRoomMessageModule'


//saga
import createSagaMiddleware from 'redux-saga'
import LogModule from './modules/logModule/LogModule'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(
    combineReducers({
        appReducer : TalkRoomMessageModule.reducer.createMessageReducer, 
        logReducer : LogModule.reducer.creatReducer,
        talkRoomReducer
    }), 
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(LogModule.saga)
sagaMiddleware.run(TalkRoomMessageModule.saga)
sagaMiddleware.run(talkRoomSaga)

export default store;
