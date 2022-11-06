const { Priority } = require('../models/models');

class taskPriorityController {
    async addPriority(ctx) {
        try {
            const { priorityName } = ctx.request.body;
            if (!priorityName) {
                ctx.throw(404, 'Не задан приоритет');
            }
            const priority = await Priority.create({ priorityName });
            ctx.body = { errorCode: 0, priority };
        } catch (err) {
            ctx.body = { errorCode: 1 };
        }
    }

    async getAllPriorities(ctx) {
        try {
            const priorities = await Priority.findAll();
            ctx.body = { priorities };
        } catch (err) {
            ctx.body = err.message;
        }
    }
}

module.exports = new taskPriorityController();