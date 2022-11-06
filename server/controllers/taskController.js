const { Task, Status, Priority } = require('../models/models')
const { Op } = require('sequelize');
const ApiError = require('../error/ApiError');

class TaskController {
    async addTask(ctx) {
        const { description, startDate, endDate } = ctx.request.body;
        let { statusId, priorityId } = ctx.request.body;
        if (!description) {
            throw ApiError.badRequest('Не задано описание задачи');
        }
        if (!statusId) {
            statusId = 1;
        }
        if (!priorityId) {
            priorityId = 1;
        }
        let task = await Task.create({ userId: ctx.params.userId, description, startDate, endDate, statusId, priorityId }, { raw: true });
        task = task.toJSON();
        if (task.statusId) {
            const status = await Status.findOne({ where: { id: task.statusId }, raw: true });
            task = { ...task, statusName: status.statusName };
        }
        if (task.priorityId) {
            const priority = await Priority.findOne({ where: { id: task.priorityId }, raw: true });
            task = { ...task, priorityName: priority.priorityName };
        }
        ctx.body = { task };
    }

    async updateTask(ctx) {
        const { taskId, description, startDate, endDate, statusId, priorityId } = ctx.request.body;
        if (!description) {
            throw ApiError.badRequest('Не задано описание задачи');
        }
        await Task.update({ description, startDate, endDate, statusId, priorityId }, { where: { id: taskId } });
        let task = await Task.findOne({ where: { id: taskId }, raw: true });
        if (task.statusId) {
            const status = await Status.findOne({ where: { id: task.statusId }, raw: true });
            task = { ...task, statusName: status.statusName };
        }
        if (task.priorityId) {
            const priority = await Priority.findOne({ where: { id: task.priorityId }, raw: true });
            task = { ...task, priorityName: priority.priorityName };
        }
        ctx.body = { task };
    }

    async getAllTasks(ctx) {
        const query = ctx.request.query;
        let prioritiesFilter = {};
        if (query.priorities) {
            const queryPriorities = query.priorities.split(",");
            prioritiesFilter = {
                priorityId: queryPriorities.map((priority) => {
                    return Number(priority);
                })
            }
        }
        let statusesFilter = {};
        if (query.statuses) {
            const queryStatuses = query.statuses.split(",");
            statusesFilter = {
                statusId: queryStatuses.map((status) => {
                    return Number(status);
                })
            }
        }

        let startDateFilter = {};
        let endDateFilter = {};
        let dateFilter = {};
        const startDate = query.startDate;
        const endDate = query.endDate;
        if (startDate && endDate) {
            startDateFilter = { startDate: { [Op.gt]: startDate, [Op.lt]: endDate } };
            endDateFilter = { endDate: { [Op.gt]: startDate, [Op.lt]: endDate } };
            dateFilter = { [Op.or]: [startDateFilter, endDateFilter] };
        }
        else if (startDate) {
            startDateFilter = { startDate: { [Op.gt]: startDate } };
            endDateFilter = { endDate: { [Op.gt]: endDate } };
            dateFilter = { [Op.or]: [startDateFilter, endDateFilter] };
        }
        else if (endDate) {
            startDateFilter = { startDate: { [Op.lt]: endDate } };
            endDateFilter = { endDate: { [Op.lt]: endDate } };
            dateFilter = { [Op.or]: [startDateFilter, endDateFilter] };
        }

        let sorting = []
        switch (query.sorting) {
            case "add":
                sorting = ['createdAt'];
                break;
            case "high":
                sorting = ['priorityId', 'DESC'];
                break;
            case "low":
                sorting = ['priorityId'];
                break;
            case "startEarly":
                sorting = ['startDate'];
                break;
            case "startLater":
                sorting = ['startDate', 'DESC'];
                break;
            case "endEarly":
                sorting = ['endDate'];
                break;
            case "endtLater":
                sorting = ['endDate', 'DESC'];
                break;
            default:
                sorting = ['createdAt'];
        }

        let tasks = await Task.findAll({ where: { [Op.and]: [{ userId: ctx.params.userId }, prioritiesFilter, statusesFilter, dateFilter] }, order: [sorting], raw: true });

        tasks = await Promise.all(tasks.map(async (task) => {
            if (task.statusId) {
                const status = await Status.findOne({ where: { id: task.statusId }, raw: true });
                return { ...task, statusName: status.statusName };
            }
            return task;
        }))

        tasks = await Promise.all(tasks.map(async (task) => {
            if (task.priorityId) {
                const priority = await Priority.findOne({ where: { id: task.priorityId }, raw: true });
                return { ...task, priorityName: priority.priorityName };
            }
            return task;
        }))

        ctx.body = { tasks };
    }

    async deleteTask(ctx) {
            await Task.destroy({ where: { id: ctx.params.taskId } });
            ctx.body = { status: 200 };
    }
}

module.exports = new TaskController();