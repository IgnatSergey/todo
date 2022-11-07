const { Priority } = require('../models/models');

class taskPriorityController {
    async addPriority(ctx) {
            const { priorityName } = ctx.request.body;
            if (!priorityName) {
                throw ApiError.badRequest('Не задан приоритет');
            }
            const priority = await Priority.create({ priorityName });
            ctx.body = { priority };
    }

    async getAllPriorities(ctx) {
            const priorities = await Priority.findAll();
            ctx.body = { priorities };
    }
}

module.exports = new taskPriorityController();