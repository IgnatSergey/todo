const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const generateJwt = (id, email, login) => {
    return jwt.sign({ id, email, login }, process.env.SECRET_KEY, { expiresIn: '24h' });
}

class UserController {
    async registration(ctx) {
        const { email, login, password } = ctx.request.body;
        if (!email || !login || !password) {
            throw ApiError.badRequest('Не задан email');
        }
        else if (!login) {
            throw ApiError.badRequest('Не задан логин');
        }
        else if (!password) {
            throw ApiError.badRequest('Не задан пароль');
        }
        const candidateEmail = await User.findOne({ where: { email } });
        if (candidateEmail) {
            throw ApiError.badRequest(`Пользователь для ${email} уже существует`);
        }
        const candidateLogin = await User.findOne({ where: { login } });
        if (candidateLogin) {
            throw ApiError.badRequest(`Пользователь с логином ${login} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword, login });
        const token = generateJwt(user.id, email, login);
        ctx.body = { errorCode: 0, token };
    }

    async login(ctx, next) {
        const { login, password } = ctx.request.body;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            throw ApiError.badRequest('Неправильный логин или пароль');
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw ApiError.badRequest('Неправильный логин или пароль');
        }
        const token = generateJwt(user.id, user.email, user.login);
        ctx.body = { token };
    }

    async checkAuthorize(ctx) {
        const fullToken = ctx.request.header.authorization;
        const token = fullToken.split(' ')[1];
        if (!token) {
            throw ApiError.authorization('Не авторизован');
        }
        let user;
        try {           
            user = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            throw ApiError.authorization('Не авторизован');
        }
        const { id, email, login } = user;
        const newToken = generateJwt(id, email, login);
        ctx.body = { token: newToken };
    }
}

module.exports = new UserController();