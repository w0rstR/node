const path = require('path');
const exporess = require('express');
const {engine} = require('express-handlebars');
const e = require("express");
let {users} = require('./db');
const app = exporess();
const apiRouters = require('./routers/apiRouters')


app.use(exporess.json());
app.use(exporess.urlencoded({extended: true}));

app.use(exporess.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.use(apiRouters)

//
// app.get('/singin',(req,res)=>{
//     res.render('singin')
// })
//
// app.post('/singin',(req,res)=>{
//     if(!req.body){
//         res.redirect('/error')
//     }
//     const itemByEmail = users.find(item=> item.email == req.body.email)
//     const itemByPass = users.find(item=> item.password == req.body.password)
//
//     if(itemByEmail && itemByPass){
//         res.redirect(`user/${itemByEmail.id}`)
//     }else{
//         res.render('notfound',{error:'Wrong password or email!!!'})
//     }
// })


// app.get('/login', (reg, res) => {
//     res.render('login');
// });

app.get('/error', (req, res) => {
    res.render('error');
});

// //
// // app.post('/login', (req, res) => {
// //     const body = req.body;
// //     const item = users.filter(item => {
// //         if (item.email == body.email) {
// //             return item;
// //         }
// //     });
// //     if (item.length) {
// //         res.redirect('/error');
// //     } else {
// //         users.push({...req.body, id: new Date().getTime()})
// //         res.redirect('/users');
// //     }
// // });
// //
// // app.get('/user/:id', (req, res) => {
// //     const {id} = req.params;
// //     const item = users.find(user=> user.id == +id);
// //     res.render('user',{user:item});
// // });
// //
// // app.post('/deleteUser',(req,res)=>{
// //     users = users.filter(user=> user.id !== +req.body.id);
// //     res.redirect('users');
// // })
// //
// //
// // app.get('/users', (req, res) => {
// //     if(Object.keys(req.query).length){
// //      let usersList = [...users];
// //      if(req.query.city){
// //          usersList = usersList.filter(item => item.city == req.query.city);
// //      }
// //      if(req.query.age){
// //          usersList = usersList.filter(item => item.age == +req.query.age);
// //      }
// //      console.log(usersList)
// //      res.render('users',{users:usersList})
// //      return
// //     }
// //     res.render('users',{users})
//
// });



app.use((req, res) => {
    res.render('notfound')
});

app.listen(5200, () => {
    console.log(`Server has started on PORT 5200`);
});