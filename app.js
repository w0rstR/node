const path = require('path');
const exporess = require('express');
const {engine} = require('express-handlebars');
const app = exporess();
const apiRouters = require('./routers/apiRouters')


app.use(exporess.json());
app.use(exporess.urlencoded({extended: true}));

app.use(exporess.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));


app.use(apiRouters);


app.listen(5200, () => {
    console.log(`Server has started on PORT 5200`);
});