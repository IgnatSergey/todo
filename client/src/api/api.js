import axios from 'axios';
import jwt_decode from "jwt-decode";

const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

authHost.interceptors.request.use(authInterceptor)

export const authAPI = {
    registrate(email, login, password) {
        return host.post('user/registration', { email, login, password }).then((response) => {
            const { token } = response.data;
            localStorage.setItem('token', token)
            return { user: jwt_decode(token) }
        })
    },

    login(login, password) {
        return host.post('user/login', { login, password }).then((response) => {
            const { token } = response.data;
            localStorage.setItem('token', token)
            return { user: jwt_decode(token) }
        })
    },

    check() {
        return authHost.get('user/auth').then((response) => {
            return response
        })
    }
}

export const taskAPI = {
    addTask(userId, description, startDate, endDate, statusId, priorityId) {
        return host.post(`task/${userId}`, { description, startDate, endDate, statusId, priorityId }).then((response) => {
            return response.data
        })
    },

    updateTask(taskId, description, startDate, endDate, statusId, priorityId) {
        return host.put(`task/${taskId}`, { taskId, description, startDate, endDate, statusId, priorityId }).then((response) => {
            return response.data
        })
    },

    getTasks(userId, query) {
        return host.get(`task/${userId}?${query}`).then((response) => {
            return response.data
        })
    },

    deleteTask(taskId) {
        return host.delete(`task/${taskId}`).then((response) => {
            return response
        })
    },

    getAllStatuses() {
        return host.get(`task_status`).then((response) => {
            return response.data
        })
    },

    getAllPriorities() {
        return host.get(`task_priority`).then((response) => {
            return response.data
        })
    }
}