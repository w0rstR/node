const usersFromDb = require('../db');

class LoginController {
    renderLogin(req, res) {
        res.render('login');
    }


    postLoginForm(req, res) {
        usersFromDb.users.push({...req.body, id: new Date().getTime()});
        res.redirect('/users');
    }
}

module.exports = new LoginController();