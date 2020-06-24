
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
import ErrorCodeModule from './modules/errorCodeModule/ErrorCodeModule'
import MessageImageModule from './modules/messageImageModule/MessageImageModule'
import UserPositionModule from './modules/userPositionModule/UserPositionModule'
import TranslateModule from './modules/translateModeModule/TranslateModule'

//middleware
const sagaMiddleware = createSagaMiddleware()
//store setting
const store = createStore(
    combineReducers({
        currentRoomStatus : TalkRoomMessageModule.reducer.createMessageReducer, 
        logStatus : LogModule.reducer.creatReducer,
        messageImages : MessageImageModule.reducer.createReducer,
        talkRooms : TalkRoomModule.reducer.createReducer,
        loading   : LoadingModule.reducer.createReducer,
        users     : UserModule.reducer.createReducer,
        userPositions : UserPositionModule.reducer.createUserPositionReducer,
        formErrors: FormErrorModule.reducer.createReducer,
        errorCodes : ErrorCodeModule.reducer.createReducer,
        translateModes : TranslateModule.reducer.createReducer
        
    }), 
    applyMiddleware(sagaMiddleware)
)

//run sagas
sagaMiddleware.run(RootSaga)

export default store;
