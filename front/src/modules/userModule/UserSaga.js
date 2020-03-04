import LogActions from "../logModule/LogActions"
import DataAccessor from "../DataAccessor"
import { call, put, all, takeEvery } from "redux-saga/effects"
import ErrorHandler from "../ErrorHandler"
import { UserActionTypes } from "./UserActions"

const getSelf = () => {
    return DataAccessor.get(({
        url:`${process.env.REACT_APP_BACKEND_ADDRESS}/users/self`
    }))
}

/**
 * Tips
 * FormDataで入れ子のデータ構造を送る場合,
 * formData.append("hoge[fuga]", foobar)
 * という書き方でいける
 */
const createUser = (
    userParams
) => {
    const formData = new FormData()
    Object.keys(userParams).forEach(paramName => {
        formData.append(`user[${paramName}]`, userParams[paramName])
    })
    return DataAccessor.post({
        url : `${process.env.REACT_APP_BACKEND_ADDRESS}/users`,
        parameter : formData,
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

//saga
function* handleGetSelf(action) {
    const result = yield call(getSelf)
    if(result.isSuccess) {
        yield put
    }
}


function* handleCreateUser(action) {
    const result = yield call(createUser, action.userParams)
    if(result.isSuccess) {
        yield put(LogActions.execLogin({
            session: {
                name : action.userParams.name,
                password : action.userParams.password
            },
            history : action.history,
        }))
    }
    if(result.isFail) {
        alert("ユーザーを作成できませんでした")
    }
    if(result.isError) {
        const errorObject = ErrorHandler({
            error : result.data,
            history : action.history
        })
        alert(errorObject.message)
    }
}

export default function* UserSaga() {
    yield all([
        takeEvery(UserActionTypes.EXEC_CREATE_USER, handleCreateUser)
    ])
}

