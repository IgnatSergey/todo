const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(ctx) {
        try {
            const { email, password } = ctx.request.body
            if (!email || !password) {
                ctx.throw(404, 'Не задан логин или пароль')
            }
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                ctx.throw(404, 'Пользователь уже существует')
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, password: hashPassword })
            const token = generateJwt(user.id, email)
            ctx.body = { errorCode: 0, token }
        } catch (err) {
            ctx.body = { errorCode: 1 }
        }
    }

    async login(ctx) {
        try {
            const { email, password } = ctx.request.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                ctx.throw(500, 'Пользователь не найден')
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                ctx.throw(500, 'Указан неверный пароль')
            }
            const token = generateJwt(user.id, user.email)
            ctx.body = { errorCode: 0, token }
        } catch (err) {
            ctx.body = { errorCode: 1 }
        }
    }

    async checkAuthorize(ctx) {
        try {
            const fullToken = ctx.request.header.authorization
            console.log('token:')
            console.log(fullToken)
            if (!fullToken) {
                ctx.throw(401, 'Не авторизован')
            }
            const token = fullToken.split(' ')[1]
            const { id, email } = jwt.verify(token, process.env.SECRET_KEY)
            const newToken = generateJwt(id, email)
            ctx.body = { errorCode: 0, token: newToken }
        } catch (err) {
            ctx.body = { errorCode: 1 }
        }
    }
}

module.exports = new UserController()