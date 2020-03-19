import { ModalActionTypes } from "./ModalActions"

const initialState = {}

const getModalStateOf = (state) => (modalName) => {
    return (state["modalStates"] || {})[modalName]
}

const createReducer = (state=initialState, action) => {
    switch(action.type) {
        case ModalActionTypes.SHOW_MODAL_OF : {
            state[action.modalName] = true
            return {
                ...state
            }
        }
        case ModalActionTypes.CLOSE_MODAL_OF : {
            state[action.modalName] = false
            return {
                ...state
            }
        }
        default : {
            return state;
        }
    }
}

export default {
    getModalStateOf,
    createReducer
}