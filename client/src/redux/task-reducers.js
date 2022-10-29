import { taskAPI } from "../api/api";

const ADD_TASK = 'ADD-TASK';
const UPDATE_TASK = 'UPDATE-TASK';
const GET_ALL_TASKS = 'GET-ALL-TASKS';
const DELETE_TASK = 'DELETE-TASK';
const GET_ALL_STATUSES = 'GET-ALL-STATUSES';
const GET_ALL_PRIORITIES = 'GET-ALL-PRIORITIES';

let initialState = {
    tasks: [],
    statuses: [],
    priorities: []
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state, tasks: [...state.tasks, action.task]
            }
        case UPDATE_TASK:
            return {
                ...state, tasks: [...state.tasks.map((task) => {
                    if (task.id === action.task.id) {
                        return action.task;
                    }
                    return task
                })]
            }
        case GET_ALL_TASKS:
            return {
                ...state, tasks: action.tasks
            }
        case DELETE_TASK:
            return {
                ...state, tasks: [...state.tasks.filter((task) => { return task.id !== action.taskId })]
            }
        case GET_ALL_STATUSES:
            return {
                ...state, statuses: action.statuses
            }
        case GET_ALL_PRIORITIES:
            return {
                ...state, priorities: action.priorities
            }
        default:
            return state;
    }
}

export const addTask = (task) => {
    return { type: ADD_TASK, task };
}

export const updateTask = (task) => {
    return { type: UPDATE_TASK, task };
}

export const getAllTasks = (tasks) => {
    return { type: GET_ALL_TASKS, tasks }
}

export const deleteTask = (taskId) => {
    return { type: DELETE_TASK, taskId }
}

export const getAllStatuses = (statuses) => {
    return { type: GET_ALL_STATUSES, statuses }
}

export const getAllPriorities = (priorities) => {
    return { type: GET_ALL_PRIORITIES, priorities }
}

export const addTaskThunkCreator = (userId, description, startDate, endDate, statusId, priorityId) => {
    return async (dispatch) => {
        const response = await taskAPI.addTask(userId, description, startDate, endDate, statusId, priorityId)
        if (response.errorCode === 0) {
            dispatch(addTask(response.task))
        }
    }
}

export const updateTaskThunkCreator = (taskId, description, startDate, endDate, statusId, priorityId) => {
    return async (dispatch) => {
        const response = await taskAPI.updateTask(taskId, description, startDate, endDate, statusId, priorityId)
        if (response.errorCode === 0) {
            dispatch(updateTask(response.task))
        }
    }
}

export const getAllTasksThunkCreator = (userId) => {
    return async (dispatch) => {
        const response = await taskAPI.getTasks(userId)
        dispatch(getAllTasks(response.tasks))
    }
}

export const deleteTaskThunkCreator = (taskId) => {
    return async (dispatch) => {
        const response = await taskAPI.deleteTask(taskId)
        if (response.errorCode === 0) {
            dispatch(deleteTask(taskId))
        }
    }
}

export const getAllStatusesThunkCreator = () => {
    return async (dispatch) => {
        const response = await taskAPI.getAllStatuses()
        dispatch(getAllStatuses(response.statuses))
    }
}

export const getAllPrioritiesThunkCreator = () => {
    return async (dispatch) => {
        const response = await taskAPI.getAllPriorities()
        dispatch(getAllPriorities(response.priorities))
    }
}

export default taskReducer;