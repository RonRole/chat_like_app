import { MessageImageActionTypes } from "./MessageImageActions"
import createReducerFactory from "../CreateReducerFactory"

/**
 * imageId : imageSrcのペア
 */
const initialState = {
    0 : {
        id:0,
        src:''
    }
}

const actionHandler={}
actionHandler[MessageImageActionTypes.ADD_MESSAGE_IMAGE] = (state, action) => {
    const newMessageImages = action.messageImages.flat()
    const newState = newMessageImages.reduce((state, newMessageImage) => {
        state[newMessageImage.id] = newMessageImage
        return state
    }, state)
    return {
        ...state,
        ...newState
    }
}
actionHandler[MessageImageActionTypes.CLEAR_MESSAGE_IMAGE] = (state, action) => {
    return {
        ...initialState
    }
}
actionHandler[MessageImageActionTypes.REMOVE_MESSAGE_IMAGE] = (state, action) => {
    const deleteMessageImageIds = [action.messageImageIds].flat()
    const newState = deleteMessageImageIds.reduce((state,messageImageId) => {
        delete state[messageImageId]
        return state
    }, state)
    return {
        ...newState
    }
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}

