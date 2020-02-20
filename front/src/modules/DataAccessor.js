import Axios from "axios"

const createNormalResponse = (response) => {
    return {
        isSuccess : response.data != undefined,
        isFail    : response.data == undefined,
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
        url,
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
        parameter
    }) => {
        return Axios.post(url, parameter)
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