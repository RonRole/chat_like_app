import LoadingActions from "./LoadingActions";
import { put, join, fork } from "redux-saga/effects";

//saga
export function* lockView(){
    yield put(LoadingActions.startLoading());
}

export function* unlockView() {
    yield put(LoadingActions.finishLoading())
}

/**
 * 引数のsagaの実行が完了するまで、stateのloadingをtrueにします。
 * @param {*} saga 
 */
export function wrapSagaWithLoading(saga){
    return function*(action) {
        yield put(LoadingActions.startLoading());
        const argSaga = yield fork(saga, action)
        yield join(argSaga)
        yield put(LoadingActions.finishLoading())
    }
}