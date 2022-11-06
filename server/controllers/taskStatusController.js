const { Status } = require('../models/models')

class taskStatusController {
    async addStatus(ctx) {
        try {
            const { statusName } = ctx.request.body;
            if (!statusName) {
                ctx.throw(404, 'Не задан статус');
            }
            const status = await Status.create({ statusName });
            ctx.body = { errorCode: 0, status };
        } catch (err) {
            ctx.body = { errorCode: 1 };
        }
    }

    async getAllStatus(ctx) {
        try {
            const statuses = await Status.findAll();
            ctx.body = { statuses };
        } catch (err) {
            ctx.body = err.message;
        }
    }
}

module.exports = new taskStatusController();