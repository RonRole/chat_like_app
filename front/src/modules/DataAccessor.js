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

const accessorMap = {
    get : ({url}) => Axios.get(url),
    post : ({url, parameter, headers={}}) => Axios.post(url, parameter, headers),
    put : ({url,parameter}) => Axios.put(url, parameter),
    delete : ({url}) => Axios.delete(url)    
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
    get   : ({url}) => handleData(accessorMap.get({url})),
    post  : ({url, parameter, headers={}}) => handleData(accessorMap.post({url,parameter,headers})),
    put   : ({url, parameter}) => handleData(accessorMap.put({url, parameter})),
    delete: ({url}) => handleData(accessorMap.delete({url}))
}