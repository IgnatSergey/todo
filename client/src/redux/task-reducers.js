import { taskAPI } from "../api/api";

const ADD_TASK = 'ADD-TASK';
const UPDATE_TASK = 'UPDATE-TASK';
const GET_ALL_TASKS = 'GET-ALL-TASKS';
const DELETE_TASK = 'DELETE-TASK';
const GET_ALL_STATUSES = 'GET-ALL-STATUSES';
const GET_ALL_PRIORITIES = 'GET-ALL-PRIORITIES';
const CHANGE_FILTER = 'CHANGE-FILTER';
const TOGGLE_FETCHING_TASKS = 'TOGGLE-FETCHING-TASKS';
const SET_ERROR_TASK = 'SET-ERROR-TASK';
const DELETE_ERROR_TASK = 'DELETE-ERROR-TASK';
const SET_ERROR_GET_TASKS = 'SET-ERROR-GET-TASKS ';

let initialState = {
    tasks: [],
    isFetching: false,
    statuses: [],
    priorities: [],
    filter: {},
    errorTasks: [],
    errorGetTasks: null,
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
        case CHANGE_FILTER:
            const arr = Object.keys(action.filter).reduce((result, parametr) => { return { ...result, [parametr]: action.filter[parametr].split(",") } }, {})
            return {
                ...state, filter: { ...state.filter, ...arr }
            }
        case TOGGLE_FETCHING_TASKS:
            return {
                ...state, isFetching: action.isFetching
            }
        case SET_ERROR_TASK:
            return {
                ...state, errorTasks: [...state.errorTasks, { taskId: action.taskId, error: action.error }]
            }
        case DELETE_ERROR_TASK:
            return {
                ...state, errorTasks: state.errorTasks.filter((errorTask) => errorTask.taskId !== action.taskId)
            }
        case SET_ERROR_GET_TASKS:
            return {
                ...state, errorGetTasks: action.errorGetTasks
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

export const changeFilter = (filter) => {
    return { type: CHANGE_FILTER, filter }
}

export const toggleFetching = (isFetching) => {
    return { type: TOGGLE_FETCHING_TASKS, isFetching }
}

export const setErrorTask = (taskId, error) => {
    return { type: SET_ERROR_TASK, taskId, error };
}

export const deleteErrorTask = (taskId) => {
    return { type: DELETE_ERROR_TASK, taskId };
}

export const setErrorGetTasks = (errorGetTasks) => {
    return { type: SET_ERROR_TASK, errorGetTasks };
}

export const addTaskThunkCreator = (userId, description, startDate, endDate, statusId, priorityId) => {
    return async (dispatch) => {
        try {
            const response = await taskAPI.addTask(userId, description, startDate, endDate, statusId, priorityId)
            dispatch(addTask(response.task))
            dispatch(deleteErrorTask(0))
        } catch (error) {
            dispatch(setErrorTask(0, error.response.data.message))
        }
    }
}

export const updateTaskThunkCreator = (taskId, description, startDate, endDate, statusId, priorityId) => {
    return async (dispatch) => {
        try {
            const response = await taskAPI.updateTask(taskId, description, startDate, endDate, statusId, priorityId)
            dispatch(updateTask(response.task))
            dispatch(deleteErrorTask(taskId))
        } catch (error) {
            dispatch(setErrorTask(taskId, error.response.data.message))
        }
    }
}

export const getAllTasksThunkCreator = (userId, query) => {
    return async (dispatch) => {
        try {
            dispatch(toggleFetching(true))
            const response = await taskAPI.getTasks(userId, query)
            dispatch(getAllTasks(response.tasks))
            dispatch(toggleFetching(false))
        } catch (error) {
            dispatch(setErrorGetTasks(error.response.data.message))
        }
    }
}

export const deleteTaskThunkCreator = (taskId) => {
    return async (dispatch) => {
        try {
            await taskAPI.deleteTask(taskId)
            dispatch(deleteTask(taskId))
        } catch (error) {

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