import axios from 'axios'

const apiUrl = 'http://localhost:8000/';
export let token = '' as string | null;;

export let setToken = (accessToken: string | null) => {
    token = accessToken
}


axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${token}`
        return config
    }
)

const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const authAPI = {
    getUsers() {
        return axios.get(`${apiUrl}users`)

    },
    createUser(firstName: string, lastName: string, email: string, age: number, companyId: number) {
        return axios.post(`${apiUrl}users`, { firstName, lastName, email, age, companyId })
    },
    getUser(userId: number) {
        debugger
        return axios.get(`${apiUrl}users/` + userId);
    },
    delete(userId: number) {
        return axios.delete(`${apiUrl}users/` + userId);
    },
    login(email: string, password: string) {
        return axios.post(`${apiUrl}auth/login`, { email, password, });
    },
    logout() {
        return axios.delete(`${apiUrl}auth/login`);
    },
    register(email: string, password: string) {
        return axios.post(`${apiUrl}auth/register`, { email, password })
    }

}

