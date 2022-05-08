import axios from 'axios'

export const BASE_URL = 'http://localhost:5044/';

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedData) => axios.put(url + id, updatedData),
        delete: id => axios.delete(url + id)
    }
}