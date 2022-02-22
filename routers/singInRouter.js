const {Router} = require('express');
const SinginController = require('../controllers/singinController')
const isUserEmailValid = require("../middlware/isUserEmailValid");

const singInRouter = Router();


singInRouter.get('/',SinginController.renderPage);


singInRouter.post('/',isUserEmailValid,SinginController.postData);

module.exports = singInRouter;