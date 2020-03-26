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

export default {
    get : ({
        url
    }) => {
        return Axios.get(url)
            .then(response => {
                return createNormalResponse(response)
            })
            .catch(error => {
                return createErrorResponse(error)
            })
    },
    post : ({
        url,
        parameter,
        headers={}
    }) => {
        return Axios.post(url, parameter, headers)
                    .then(response => {
                        return createNormalResponse(response)
                    })
                    .catch(error => {
                        return createErrorResponse(error)
                    })
    },

    put : ({
        url,
        parameter,
    }) => {
        return Axios.put(url, parameter)
                    .then(response => {
                        return createNormalResponse(response)
                    })
                    .catch(error => {
                        return createErrorResponse(error)
                    })
    },
    delete : ({
        url
    }) => {
        return Axios.delete(url)
                    .then(response => {
                        return createNormalResponse(response)
                    })
                    .catch(error => {
                        return createErrorResponse(error)
                    })
    }
}