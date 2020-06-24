import { put } from "redux-saga/effects";
import TranslateModeActions from "./TranslateModeActions";

export function* execChangeDescription(action) {
    yield put(TranslateModeActions.changeDescription({
        translateMode : action.translateMode,
        description : action.description
    }))
}