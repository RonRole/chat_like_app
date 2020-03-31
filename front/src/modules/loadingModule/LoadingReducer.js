import { LoadingActionTypes } from "./LoadingActions"

/**
 * loadingStateの数字はロード中プロセスの数を表す
 * 新しく読みこむ場合、loadingState+1
 * 読み込みが終了した場合、loadingState-1
 * START_LOADINGとFINISH_LOADINGは同じ回数だけ呼ばれないといけない
 */
const initialState = 0

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case LoadingActionTypes.START_LOADING : {
            return state+1
        }
        //読み込み中プロセスの数がマイナスにならないように
        case LoadingActionTypes.FINISH_LOADING : {
            return Math.max(state-1,0)
        }
        default : {
            return state
        }
    }
}

export default {
    createReducer
}