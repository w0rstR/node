const usersFromDb = require('../db');

function isUserExist(req, res, next) {
    try {
        const {email} = req.body;
        const item = usersFromDb.users.find(user => user.email == email);

        if (item) {
            throw new Error('User with this email exist!');
        }

        next();

    } catch (error) {
        res.render('error', {error});
    }
}

module.exports = isUserExist;