const {Route,Router} = require('express');
const usersFromDb = require('../db');
const LoginController = require('../controllers/loginController')
const isUserValid = require('../middlware/isUserValid');
const loginRouter = Router();



loginRouter.get('/',LoginController.renderLogin)

loginRouter.post('/',isUserValid,LoginController.postLoginForm)

module.exports = loginRouter