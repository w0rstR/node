function isUserValid(req,res,next){
    try{
        const {login,password} = req.body;

        if(!login || !password){
            throw new Error('Wrong login or password!!!!!!!!')
        }

        if(password.length < 5){
            throw new Error('Not valid password')
        }

        next()
    }catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = isUserValid
