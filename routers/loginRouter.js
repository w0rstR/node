const {Route, Router} = require('express');
const usersFromDb = require('../db');
const LoginController = require('../controllers/loginController')
const isUserValid = require('../middlware/isUserValid');
const isUserLoginValid = require("../middlware/isUserLoginValid");
const isUserExist = require("../middlware/isUserExist");
const loginRouter = Router();


loginRouter.get('/', LoginController.renderLogin);

loginRouter.post('/', isUserLoginValid, isUserExist, LoginController.postLoginForm);

module.exports = loginRouter;