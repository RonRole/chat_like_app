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
 * 引数のsagaの実行が完了するまで、stateのloadingプロセスを追加します。
 * @param {*} saga 
 */
export function addLoadingStateUntilSagaFinish(...argSagas){
    return function*(action) {
        yield put(LoadingActions.startLoading());
        for(const saga of argSagas) {
            const currentSaga = yield fork(saga, action)
            yield join(currentSaga)
        }
        yield put(LoadingActions.finishLoading())
    }
}