require('dotenv').config();
const koa = require('koa');
const koaBody = require('koa-body');
const router = require('./router/index.js');
const sequelize = require('./db');
const cors = require('koa-cors');
const errorHandler = require('./middleware/ErrorHandingMiddleware')

const PORT = process.env.PORT || 5000;

const app = new koa();

app.use(errorHandler())
app.use(koaBody());
app.use(cors());
app.use(router.routes());

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`work ${PORT}`));
    } catch (e) {
    }
}

start();
