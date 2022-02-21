const usersFromDb = require("../db");

class LoginController{
    renderLogin(req,res){
        res.render('login');
    }


    postLoginForm(req,res){
        const body = req.body;
        const item = usersFromDb.users.filter(item => {
            if (item.email == body.email) {
                return item;
            }
        });
        if (item.length) {
            res.redirect('/error');
        } else {
            usersFromDb.users.push({...req.body, id: new Date().getTime()})
            res.redirect('/users');
        }
    }
}

module.exports = new LoginController()