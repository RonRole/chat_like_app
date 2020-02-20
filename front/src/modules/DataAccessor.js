import Axios from "axios"

export default {
    get : ({
        url,
    }) => {
        return Axios.get(url)
            .then(response => {
                    return {
                        isSuccess : response.data != undefined, 
                        isFail    : response.data === undefined,
                        data      : response.data
                    } 
            })
            .catch(error => {
                return {
                        isError   : true,
                        data      : error
                }
            })
    },
    post : ({
        url,
        argument
    }) => {
        return Axios.post(url, argument)
            .then(response => {
                if(response.data){
                    return {
                        isSuccess : true,
                        data      : response.data
                    } 
                }
                else {
                    return {
                        isFail    : true,
                        data      : response.data
                    }   
                }
            })
            .catch(error => {
                return {
                        isError   : true,
                        data      : error
                }
            })
    }
}