import { LoadingActionTypes } from "./LoadingActions"
import createReducerFactory from "../CreateReducerFactory"

/**
 * loadingStateの数字はロード中プロセスの数を表す
 * 新しく読みこむ場合、loadingState+1
 * 読み込みが終了した場合、loadingState-1
 * START_LOADINGとFINISH_LOADINGは同じ回数だけ呼ばれないといけない
 */
const initialState = 0

const actionHandler = {}
actionHandler[LoadingActionTypes.START_LOADING] = (state) => {
    return state+1
}
//読み込み中プロセスの数がマイナスにならないように
actionHandler[LoadingActionTypes.FINISH_LOADING] = (state) => {
    return Math.max(state-1,0)
}

const createReducer = createReducerFactory(initialState, actionHandler)

export default {
    createReducer
}