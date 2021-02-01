import axios from 'axios'


const getApiService = (url: string): any => {
    return axios.get(url)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.log(error)
            return error
        })
}

export default getApiService
