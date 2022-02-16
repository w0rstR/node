const path = require('path');
const fs = require('fs');

const onlineUsers = [
    {name: "Maks", age: 22, city: "Lviv"},
];

const inPersonUsers = [
    {name: "Oleg", age: 19, city: "Kiev"},
];


function append(dirMain, dirName, fileName, data) {
    for (let item of data) {
        for (let key in item) {
            fs.appendFile(path.join(__dirname, dirMain, dirName, fileName), `${key.toUpperCase()}:${item[key]}\n`, (err) => {
                if (err) {
                    return console.log(err)
                }
            })
        }
    }
}


fs.mkdir(path.join(__dirname, 'main'), (error) => {
    if (error) {
        return console.log(error)
    }

    fs.mkdir(path.join(__dirname + '/main', 'inPerson'), (error) => {
        if (error) {
            return console.log(error)
        }

    })

    fs.mkdir(path.join(__dirname + '/main', 'online'), (error) => {
        if (error) {
            return console.log(error)
        }
        append('main', 'inPerson', 'inPerson.txt', onlineUsers)
        append('main', 'online', 'online.txt', inPersonUsers)
    })

})