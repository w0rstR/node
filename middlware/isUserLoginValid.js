function isUserLoginValid(req, res, next) {
    try {
        const {firstname, lastname, password, age, city} = req.body;
        const keys = Object.keys(req.body);
        const emptyValues = [];

        keys.forEach(key => {
            if (req.body[key] == '') {
                emptyValues.push(key);
            }
        });


        if (parseInt(firstname)) {
            throw new Error(`First name is not valid!`);
        }

        if (parseInt(lastname)) {
            throw new Error(`Last Name is name is not valid!`);
        }

        if (emptyValues.length) {
            throw new Error(`Please fill in the field --> ${emptyValues.join('---')}`);
        }

        if (password.length < 5) {
            throw new Error(`Password not valid!`);
        }

        if (!parseInt(age)) {
            throw new Error(`Age not valid! Please write number!`);
        }

        if (parseInt(city)) {
            throw new Error(`City name is not valid!`);
        }

        next();

    } catch (error) {
        res.render('error', {error});
    }
}

module.exports = isUserLoginValid;