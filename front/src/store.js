
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
        messages  : TalkRoomMessageModule.reducer.createMessageReducer, 
        logStatus : LogModule.reducer.creatReducer,
        talkRooms : TalkRoomModule.reducer.createReducer,
        loading   : LoadingModule.reducer.createReducer,
        users     : UserModule.reducer.createReducer
    }), 
    applyMiddleware(sagaMiddleware)
)

//run sagas
sagaMiddleware.run(RootSaga)

export default store;
