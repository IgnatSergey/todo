const Router = require('koa-router');
const router = new Router();
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController');
const taskStatusController = require('../controllers/taskStatusController');
const taskPriorityController = require('../controllers/taskPriorityController');

router.post('/api/user/registration', userController.registration)
router.post('/api/user/login', userController.login)
router.get('/api/user/auth', userController.checkAuthorize)

router.post('/api/task/:userId', taskController.addTask)
router.get('/api/task/:userId', taskController.getAllTasks)
router.delete('/api/task/:taskId', taskController.deleteTask)
router.put('/api/task/:taskId', taskController.updateTask)

router.get('/api/task_status', taskStatusController.getAllStatus)
router.post('/api/task_status', taskStatusController.addStatus)

router.get('/api/task_priority', taskPriorityController.getAllPriorities)
router.post('/api/task_priority', taskPriorityController.addPriority)

module.exports = router;