const path = require('path');
const exporess = require('express');
const {engine} = require('express-handlebars');

const app = exporess();

app.use(exporess.json());
app.use(exporess.urlencoded({extended: true}));

app.use(exporess.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

const users = [
    {
        id: 31231,
        firstname: 'Alex',
        lastname: 'Sender',
        email: 'test@mail.ru',
        password: '123123',
        age: 22,
        city: 'Kiev'
    },
    {
        id: 3231,
        firstname: 'Alex',
        lastname: 'Sender',
        email: 'test@mail.ru',
        password: '123123',
        age: 20,
        city: 'Lviv'
    },
    {
        id: 3121,
        firstname: 'Alex',
        lastname: 'Sender',
        email: 'test@mail.ru',
        password: '123123',
        age: 21,
        city: 'Ternopil'
    },
    {
        id: 3123,
        firstname: 'Olex',
        lastname: 'Sender',
        email: 'test@mail.ru',
        password: '123123',
        age: 22,
        city: 'Lviv'
    },
];


app.get('/login', (reg, res) => {
    res.render('login');
});

app.get('/error', (req, res) => {
    res.render('error');
});


app.post('/login', (req, res) => {
    const body = req.body;
    const item = users.filter(item => {
        if (item.email == body.email) {
            return item
        }
    });
    if (item.length) {
        res.redirect('/error');
    } else {
        users.push({...req.body, id: new Date().getTime()})
        res.redirect('/users');
    }
});

app.get('/user/:id', (req, res) => {
    const {id} = req.params;

    for (let item of users) {
        if (item.id == id) {
            res.render('user', {user: item})
        }
    }

});

app.get('/users', (req, res) => {
    const {age, city} = req.query;
    let filteredList = [];
    if (age && city) {
        filteredList = users.filter(item => item.age == +age && item.city == city);
        res.render('users', {users: filteredList})
    } else if (age) {
        filteredList = users.filter(item => item.age == +age);
        res.render('users', {users: filteredList})
    } else if (city) {
        filteredList = users.filter(item => item.city == city);
        res.render('users', {users: filteredList})
    } else {
        res.render('users', {users})
    }
});

app.use((req, res) => {
    res.render('notfound')
});

app.listen(5200, () => {
    console.log(`Server has started on PORT 5200`);
});