import DataAccessor from "../DataAccessor"
import { call, put } from "redux-saga/effects"
import SoundActions from "./SoundActions"

const bgm = new Audio()
bgm.loop = true

export function* playBGM(action) {
    bgm.src = action.bgmSrcUrl
    yield bgm.play().catch(err => {
        console.log(err)
    })
}

export function* pauseBGM() {
    bgm.currentTime = 0.0
    yield bgm.pause()
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
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${action.userId}/bgms`,
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
    else {
        alert('bgmのアップロードに失敗しました')
    }
}


export function* fetchUserBgms(action) {
    const userId = action.userId || action.loginUser.id
    const result = yield call(DataAccessor.get, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}/bgms`
    })
    yield put(SoundActions.addBgms({
        bgms : result.data
    }))
}