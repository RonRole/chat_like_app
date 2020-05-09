import { put } from "redux-saga/effects"
import ErrorCodeActions, { ErrorCodeActionTypes } from "./ErrorCodeActions"
import LogActions from "../logModule/LogActions"

/**
 * 実質HANDLE_ERROR_CODE専用
 * @param {*} action 
 */
export function* handleError(action) {
    switch(action.errorCode) {
        case 401 : {
            yield put(LogActions.logout())
        }
    }
}