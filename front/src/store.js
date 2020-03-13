
import {createStore, combineReducers, applyMiddleware} from 'redux'

import TalkRoomMessageModule from './modules/talkRoomMessageModule/TalkRoomMessageModule'


//saga
import createSagaMiddleware from 'redux-saga'
import LogModule from './modules/logModule/LogModule'
import TalkRoomModule from './modules/talkRoomModule/TalkRoomModule'
import UserModule from './modules/userModule/UserModule'
import LoadingModule from './modules/loadingModule/LoadingModule'
import RootSaga from './modules/RootSaga'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(
    combineReducers({
        appReducer      : TalkRoomMessageModule.reducer.createMessageReducer, 
        logReducer      : LogModule.reducer.creatReducer,
        talkRoomReducer : TalkRoomModule.reducer.createReducer,
        loadingReducer  : LoadingModule.reducer.createReducer,
        userReducer     : UserModule.reducer.createReducer
    }), 
    applyMiddleware(sagaMiddleware)
)

//run sagas
sagaMiddleware.run(RootSaga)

export default store;
