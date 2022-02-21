const {Route,Router} = require('express');
const usersFromDb = require('../db');
const SinginController = require('../controllers/singinController')

const singInRouter = Router();


singInRouter.get('/',SinginController.renderPage)


singInRouter.post('/',SinginController.postData)

module.exports = singInRouter