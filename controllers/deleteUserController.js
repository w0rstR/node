const usersFromDb = require('../db');

class DeleteUserController {
    deleteUser(req, res) {
        usersFromDb.users = usersFromDb.users.filter(user => user.id !== +req.body.id);
        res.redirect('users');
    }
}

module.exports = new DeleteUserController();