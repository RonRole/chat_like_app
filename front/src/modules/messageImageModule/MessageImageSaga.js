import DataAccessor from "../DataAccessor"
import MessageImageActions from "./MessageImageActions"
import ErrorCodeActions from "../errorCodeModule/ErrorCodeActions"
import { call, put } from "redux-saga/effects"

const fetchUsersMessageImages = () => {
    return DataAccessor.get({
        url:`${process.env.REACT_APP_BACKEND_ADDRESS}/message_images`
    })
}

export function* handleClearMessageImage() {
    yield put(MessageImageActions.clearMessageImage())
}

export function* handleFetchLoginUsersMessageImages(action) {
    const result = yield call(fetchUsersMessageImages, action.loginUser.id)
    if(result.isSuccess) {
        yield put(MessageImageActions.addMessageImage(result.data))
    }
    if(result.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:result.data}))
    }
}

const createMessageImage = ({   
    messageImageParams
}) => {
    const formData = Object.keys(messageImageParams).reduce((formData,paramName) => {
        formData.append(`message_image[${paramName}]`, messageImageParams[paramName])
        return formData
    }, new FormData())
    return DataAccessor.post({
        url:`${process.env.REACT_APP_BACKEND_ADDRESS}/message_images`,
        parameter: formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

export function* handleUploadMessageImage(action) {
    const uploadResult = yield call(createMessageImage,{
        userId : action.userId, 
        messageImageParams : action.messageImageParams
    })
    if(uploadResult.isSuccess) {
        yield put(MessageImageActions.addMessageImage(uploadResult.data))
    }
    if(uploadResult.isFail) {
        alert('画像をアップロードできませんでした')
    }
    if(uploadResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:uploadResult.data}))
    }
}

export function* handleDeleteMessageImage(action) {
    const deleteResult = yield call(DataAccessor.delete, {
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/message_images/${action.messageImageId}`
    })
    if(deleteResult.isSuccess) {
        yield put(MessageImageActions.removeMessageImage(deleteResult.data.id))
    }
    if(deleteResult.isFail) {
        alert(deleteResult.data.src)
    }
    if(deleteResult.isError) {
        yield put(ErrorCodeActions.execHandleError({errorResult:deleteResult.data}))
    }
}