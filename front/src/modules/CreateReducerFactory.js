import { LogActionTypes } from "./logModule/LogActions"

const createReducerFactory = (initialState, actionHandler) => {
    return (state=initialState, action) => {
        const handler = actionHandler[action.type]
        if(handler) {
            return handler(state, action)
        }
        return state
    }
}

export default createReducerFactory