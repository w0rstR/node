const usersFromDb = require("../db");

class SinginController{
    renderPage(req,res){
        res.render('singin')
    }

    postData(req,res){
        if(!req.body){
            res.redirect('/error')
        }
        const itemByEmail = usersFromDb.users.find(item=> item.email == req.body.email)
        const itemByPass = usersFromDb.users.find(item=> item.password == req.body.password)

        if(itemByEmail && itemByPass){
            res.redirect(`user/${itemByEmail.id}`)
        }else{
            res.render('notfound',{error:'Wrong password or email!!!'})
        }
    }
}

module.exports = new SinginController()