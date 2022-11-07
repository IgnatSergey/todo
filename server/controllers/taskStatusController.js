const { Status } = require('../models/models')

class taskStatusController {
    async addStatus(ctx) {
        const { statusName } = ctx.request.body;
        if (!statusName) {
            throw ApiError.badRequest('Не задан статус');
        }
        const status = await Status.create({ statusName });
        ctx.body = { status };
    }

    async getAllStatus(ctx) {
        const statuses = await Status.findAll();
        ctx.body = { statuses };
    }
}

module.exports = new taskStatusController();