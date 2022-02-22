const usersFromDb = require('../db');

function isUserEmailValid(req, res, next) {
    try {
        const {email} = req.body;

        const item = usersFromDb.users.find(user => user.email == email);

        if (!item) {
            throw new Error('This email not found');
        }


        next();
    } catch (error) {
        res.render('error', {error});
    }
}

module.exports = isUserEmailValid;