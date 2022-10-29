const sequelize = require('../db');
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
}, {
    freezeTableName: true,
})

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
}, {
    freezeTableName: true,
})

const Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    statusName: { type: DataTypes.STRING, unique: true }
}, {
    freezeTableName: true,
})

const Priority = sequelize.define('priority', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    priorityName: { type: DataTypes.STRING, unique: true }
}, {
    freezeTableName: true,
})

User.hasMany(Task)
Task.belongsTo(User)

Status.hasMany(Task)
Task.belongsTo(Status)

Priority.hasMany(Task)
Task.belongsTo(Priority)

module.exports = { User, Task, Status, Priority }