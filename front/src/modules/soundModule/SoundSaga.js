import DataAccessor from "../DataAccessor"
import { call, put, take } from "redux-saga/effects"
import SoundActions from "./SoundActions"
import ErrorCodeActions from "../errorCodeModule/ErrorCodeActions"
import { eventChannel } from "redux-saga"

const bgm = new Audio()
bgm.loop = false

export function* readyToBgmEnd() {
    const channel = eventChannel(emit => {
        bgm.onended = e => emit(e)
        return () => console.log("end of bgm channel")
    })
    while(true) {
        yield take(channel)
        yield put(SoundActions.changeCurrentBgmId({
            bgmId : 0
        }))
    }
}

export function* playBGM(action) {
    bgm.src = action.bgmSrcUrl 
    yield bgm.play().catch(err => {
        console.log(err)
    })
    yield put(SoundActions.changeCurrentBgmId({
        bgmId : action.bgmId
    }))
}

export function* stopBGM() {
    bgm.currentTime = 0.0
    yield bgm.pause()
    yield put(SoundActions.changeCurrentBgmId({
        bgmId : 0
    }))
}

export function* playAddMessageSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/add_message.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playReceiveMessageSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/receive_message.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playJoinRoomSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/入店するときのベル.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* playLeaveRoomSound() {
    const sound = new Audio(`${process.env.PUBLIC_URL}/sounds/se_maoudamashii_chime08.mp3`)
    yield sound.play().catch(err => {
        console.log(err)
    })
}

export function* uploadBGM(action) {
    const formData = Object.keys(action.bgmParams).reduce((formData, paramName) => {
        formData.append(`bgm[${paramName}]`, action.bgmParams[paramName])
        return formData
    }, new FormData())
    const result = yield call(DataAccessor.post, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/bgms`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
    if(result.isSuccess) {
        yield put(SoundActions.addBgms({
            bgms : result.data
        }))
    }
    if(result.isFail) {
        const errorMessages = [result.data.src].map(message => `\n・${message}`)
        alert(`BGMをアップロードできませんでした。${errorMessages}`)
    }
}


export function* fetchUserBgms() {
    const result = yield call(DataAccessor.get, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/bgms`
    })
    yield put(SoundActions.fetchBgms({
        bgms : result.data
    }))
}

export function* execDeleteBgm(action) {
    const bgmId = action.bgmId
    const result = yield call(DataAccessor.delete, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/bgms/${bgmId}`
    })
    if(result.isSuccess) {
        yield put(SoundActions.deleteBgm({
            bgmId
        }))
    }
    if(result.isError) {
        ErrorCodeActions.execHandleError({
            errorResult : result.data
        })
    }
}

export function* execUpdateBgm(action) {
    const bgmId = action.bgmId
    const result = yield call(DataAccessor.put, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/bgms/${bgmId}`,
        parameter : {
            title : action.bgmTitle
        }
    })
    if(result.isSuccess) {
        yield put(SoundActions.updateBgm({
            bgmId,
            bgmTitle : action.bgmTitle
        }))
    }
    if(result.isError) {
        ErrorCodeActions.execHandleError({
            errorResult : result.data
        })
    }
}