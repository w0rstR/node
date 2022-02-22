const {Router} = require('express');
const usersRouter = require('./usersRouter');
const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter');
const deleteUserRouter = require("./deleteUserRouter");
const singInRouter = require("./singInRouter");


const routes = Router();


routes.use('/users', usersRouter);
routes.use('/user', userRouter);
routes.use('/login', loginRouter);
routes.use('/deleteUser', deleteUserRouter);
routes.use('/singin', singInRouter);

routes.use((req, res) => {
    res.render('notfound');
});


module.exports = routes;