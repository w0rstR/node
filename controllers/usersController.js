const usersFromDb = require("../db");

class UsersController{
    renderUsers(req,res){
        if(Object.keys(req.query).length){
            let usersList = [...usersFromDb.users];
            if(req.query.city){
                usersList = usersList.filter(item => item.city == req.query.city);
            }
            if(req.query.age){
                usersList = usersList.filter(item => item.age == +req.query.age);
            }
            console.log(usersList)
            res.render('users',{users:usersList})
            return
        }
        res.render('users',{users:usersFromDb.users})
    }
}

module.exports = new UsersController()