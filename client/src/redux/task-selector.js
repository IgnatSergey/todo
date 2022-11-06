export const getTasks = (state) => {
    return state.task.tasks;
}

export const getStatuses= (state) => {
    return state.task.statuses;
}

export const getPriorities= (state) => {
    return state.task.priorities;
}

export const getFilter= (state) => {
    return state.task.filter;
}

export const getFetchingStatus= (state) => {
    return state.task.isFetching;
}

export const getErrorTask= (state) => {
    return state.task.errorTasks;
}

export const getErrorGetTasks= (state) => {
    return state.task.errorGetTasks;
}