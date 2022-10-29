import axios from 'axios';
import jwt_decode from "jwt-decode";
import { getTasks } from '../redux/task-selector';

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
    registrate(email, password) {
        return host.post('user/registration', { email, password }).then((response) => {
            const { errorCode, token } = response.data;
            localStorage.setItem('token', token)
            return { errorCode, user: jwt_decode(token) }
        })
    },

    login(email, password) {
        return host.post('user/login', { email, password }).then((response) => {
            const { errorCode, token } = response.data;
            localStorage.setItem('token', token)
            return { errorCode, user: jwt_decode(token) }
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
        return host.put(`task/${taskId}`, {taskId, description, startDate, endDate, statusId, priorityId }).then((response) => {
            return response.data
        })
    },

    getTasks(userId) {
        return host.get(`task/${userId}`).then((response) => {
            return response.data
        })
    },

    deleteTask(taskId) {
        return host.delete(`task/${taskId}`).then((response) => {
            return response.data
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