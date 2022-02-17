const path = require('path');
const fs = require('fs');

const onlineUsers = [
    {name: 'Marta', age: 24, city: 'Lviv'},
    {name: 'Oleg', age: 32, city: 'Lviv'},
    {name: 'Kira', age: 30, city: 'Kiev'},
];

const inPersonUsers = [
    {name: 'Andriy', age: 21, city: 'Lviv'},
    {name: 'Dima', age: 42, city: 'Ternopil'},
    {name: 'John', age: 22, city: 'Lviv'},
];


function append(dirMain, dirName, fileName, data) {
    for (let item of data) {
        for (let key in item) {
            fs.appendFile(path.join(__dirname, dirMain, dirName, fileName), `${key.toUpperCase()}:${item[key]}\n`, (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            });
        }
    }
}


// fs.mkdir(path.join(__dirname, 'main'), (error) => {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//
//     fs.mkdir(path.join(__dirname , 'main', 'inPerson'), (error) => {
//         if (error) {
//             console.log(error);
//             throw error;
//         }
//         append('main', 'inPerson', 'inPerson.txt', inPersonUsers);
//
//     });
//
//     fs.mkdir(path.join(__dirname , 'main', 'online'), (error) => {
//         if (error) {
//             console.log(error);
//             throw error;
//         }
//         append('main', 'online', 'online.txt', onlineUsers)
//     });
//
// });

function overwriteData(curentDir,newDir){
    fs.readdir((path.join(__dirname,'main',curentDir)),(error,files)=>{
        if(error){
            console.log(error);
            throw error;
        }
        files.forEach(file=>{
            fs.readFile((path.join(__dirname,'main',curentDir,file)),(error,dataFile)=>{
                if(error){
                    console.log(error);
                    throw error;
                }
                fs.readdir((path.join(__dirname,'main',newDir)),(error,fls)=>{
                    if(error){
                        console.log(error);
                        throw error;
                    }
                    fls.forEach(f=>{
                        fs.writeFile((path.join(__dirname,'main',newDir,f)),dataFile,(err)=>{
                            if(err){
                                console.log(err);
                                throw err
                            }
                            console.log('finish');
                        });
                    });
                });
            });
        });
    });
}
overwriteData('online','inPerson');
overwriteData('inPerson','online');