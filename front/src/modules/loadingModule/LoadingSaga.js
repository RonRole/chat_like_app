import LoadingActions from "./LoadingActions";
import { takeEvery, all, put } from "redux-saga/effects";
import { LogActionTypes } from "../logModule/LogActions";

//saga
export function viewLock(func){
}


export default function* LoadingSaga() {
    yield all([
        //takeEvery("*",handleExecAction)
    ])
}