const usersFromDb = require("../db");

class userController{
    renderUser(req,res){
        const {id} = req.params;
        console.log(usersFromDb)
        const item = usersFromDb.users.find(user=> user.id == +id);
        res.render('user',{user:item});
    }
}

module.exports = new userController()