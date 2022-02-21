const {Route, Router} = require('express');
const usersFromDb = require('../db')
const UsersController = require('../controllers/usersController')
const usersRouter = Router();


usersRouter.get('/',UsersController.renderUsers)



module.exports = usersRouter;