
import {createStore, combineReducers, applyMiddleware} from 'redux'

import TalkRoomMessageModule from './modules/currentRoomStatusModule/CurrentRoomStatusModule'


//saga
import createSagaMiddleware from 'redux-saga'
import LogModule from './modules/logModule/LogModule'
import TalkRoomModule from './modules/talkRoomModule/TalkRoomModule'
import UserModule from './modules/userModule/UserModule'
import LoadingModule from './modules/loadingModule/LoadingModule'
import RootSaga from './modules/RootSaga'
import FormErrorModule from './modules/FormErrorModule/FormErrorModule'
import ModalModule from './modules/ModalModule/ModalModule'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(
    combineReducers({
        currentRoomStatus : TalkRoomMessageModule.reducer.createMessageReducer, 
        logStatus : LogModule.reducer.creatReducer,
        talkRooms : TalkRoomModule.reducer.createReducer,
        loading   : LoadingModule.reducer.createReducer,
        users     : UserModule.reducer.createReducer,
        formErrors: FormErrorModule.reducer.createReducer,
        modalStates : ModalModule.reducer.createReducer
    }), 
    applyMiddleware(sagaMiddleware)
)

//run sagas
sagaMiddleware.run(RootSaga)

export default store;
