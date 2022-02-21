const {Router}  = require('express');
const DeleteUserController = require('../controllers/deleteUserController');



const deleteUserRouter = Router();


deleteUserRouter.post('/',DeleteUserController.deleteUser);


module.exports = deleteUserRouter;