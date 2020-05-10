import { put } from "redux-saga/effects"
import LogActions from "../logModule/LogActions"

/**
 * 実質HANDLE_ERROR_CODE専用
 * @param {*} action 
 */
const errorCodeToAction = {}
errorCodeToAction[401] = LogActions.logout()

export function* handleError(action) {
    const putAction = errorCodeToAction[action.errorCode]
    if(putAction) {
        yield put(putAction)
    }
}