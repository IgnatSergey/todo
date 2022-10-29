const { Task } = require('../models/models')

class TaskController {
    async addTask(ctx) {
        try {
            const { description, startDate, endDate, statusId, priorityId } = ctx.request.body
            if (!description) {
                ctx.throw(404, 'Не задано описание задачи')
            }
            const task = await Task.create({ userId: ctx.params.userId, description, startDate, endDate, statusId, priorityId })
            ctx.body = { errorCode: 0, task }
        } catch (err) {
            ctx.body = { errorCode: 1 }
        }
    }

    async updateTask(ctx) {
        try {
            const { taskId, description, startDate, endDate, statusId, priorityId } = ctx.request.body
            if (!description) {
                ctx.throw(404, 'Не задано описание задачи')
            }
            await Task.update({ description, startDate, endDate, statusId, priorityId }, {where: {id: taskId}})
            const task = await Task.findOne({ where: { id: taskId } })
            ctx.body = { errorCode: 0, task }
        } catch (err) {
            ctx.body = { errorCode: 1 }
        }
    }

    async getAllTasks(ctx) {
        try {
            const tasks = await Task.findAll({ where: { userId: ctx.params.userId } })
            ctx.body = { tasks }
        } catch (err) {
            ctx.body = err.message
        }
    }

    async deleteTask(ctx) {
        try {
            await Task.destroy({ where: { id: ctx.params.taskId } })
            ctx.body = { errorCode: 0 }
        } catch (err) {
            ctx.body = { errorCode: 1 }
        }
    }
}

module.exports = new TaskController()