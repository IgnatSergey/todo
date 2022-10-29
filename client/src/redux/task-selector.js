export const getTasks = (state) => {
    return state.task.tasks;
}

export const getStatuses= (state) => {
    return state.task.statuses;
}

export const getPriorities= (state) => {
    return state.task.priorities;
}