import Axios from "axios"

//cookieを使用するための設定
Axios.defaults.withCredentials = true
//Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

const createNormalResponse = (response) => {
    return {
        isSuccess : !response.data.isFail,
        isFail    : response.data.isFail,
        data      : response.data
    }
}

const createErrorResponse = (error) => {
    return {
        isError : true,
        data    : error
    }
}

const handleData = (promise) => {
    return promise
        .then(response => {
            return createNormalResponse(response)
        })
        .catch(error => {
            return createErrorResponse(error)
        })
}
export default {
    get   : ({url}) => handleData(Axios.get(url)),
    post  : ({url, parameter, headers={}}) => handleData(Axios.post(url,parameter,headers)),
    put   : ({url, parameter}) => handleData(Axios.put(url, parameter)),
    delete: ({url, parameter}) => handleData(Axios.delete(url, {data : parameter}))
}