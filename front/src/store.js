
import {createStore, combineReducers, applyMiddleware} from 'redux'

import TalkRoomMessageModule from './modules/talkRoomMessageModule/TalkRoomMessageModule'


//saga
import createSagaMiddleware from 'redux-saga'
import LogModule from './modules/logModule/LogModule'
import TalkRoomModule from './modules/talkRoomModule/TalkRoomModule'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(
    combineReducers({
        appReducer      : TalkRoomMessageModule.reducer.createMessageReducer, 
        logReducer      : LogModule.reducer.creatReducer,
        talkRoomReducer : TalkRoomModule.reducer.createReducer
    }), 
    applyMiddleware(sagaMiddleware)
)

//run sagas
sagaMiddleware.run(LogModule.saga)
sagaMiddleware.run(TalkRoomMessageModule.saga)
sagaMiddleware.run(TalkRoomModule.saga)

export default store;
