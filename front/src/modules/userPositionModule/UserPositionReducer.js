import createReducerFactory from "../CreateReducerFactory"
import { CurrentRoomStatusActionTypes } from "../currentRoomStatusModule/CurrentRoomStatusActions"
import { UserPositionActionTypes } from "./UserPositionActions"


const initialState = {
    default : {
        latitude:0,
        longitude:0
    }
}

const actionHandler = {}
actionHandler[UserPositionActionTypes.CHANGE_CURRENT_USER_POSITION] =
actionHandler[UserPositionActionTypes.RECEIVE_CURRENT_USER_POSITION] = (state, action) => {
    state[action.userId] = state[action.userId] || {...initialState}
    state[action.userId] = action.position
    return {
        ...state
    } 
}

export default {
    createUserPositionReducer: createReducerFactory(initialState, actionHandler)
}