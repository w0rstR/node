const {Route, Router} = require('express');
const userController = require('../controllers/userController')
const userRouter = Router();


userRouter.get('/:id',userController.renderUser);

module.exports = userRouter;