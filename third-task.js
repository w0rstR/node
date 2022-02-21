const path = require('path');
const fs = require('fs');


const list_dir = ['first-folder', 'second-folder', 'third-folder', 'fourth-folder'];
const list_file = ['first-file.txt', 'second-file.txt', 'third-file.txt', 'fourth-file.txt']



fs.mkdir(path.join(__dirname,'main'),(error)=>{
    if (error){
        console.log(error);
        throw error;
    }
    for (let item of list_dir){
        fs.mkdir(path.join(__dirname,'main',item),(error)=>{
            if(error){
                console.log(error);
                throw error;
            }
            for(let f of list_file){
                fs.appendFile(path.join(__dirname,'main',item,f),`SOME DATA IN FILE ${f}`,(error)=>{
                    if(error){
                        console.log(error);
                        throw error;
                    }
                });
            }
        });
    }
});



function checkDirectory(dirname) {
    fs.readdir(path.join(__dirname, dirname), (error, dr) => {
        if (error) {
            console.log(error);
            throw error;
        }
        for (let item of dr) {
            fs.stat(path.join(__dirname, dirname, item), (error, s) => {
                if (error) {
                    console.log(error);
                    throw error;
                }
                if (s.isFile()) {
                    fs.writeFile(path.join(__dirname, dirname, item), '', (error) => {
                        if (error) {
                            console.log(error);
                            throw error;
                        }
                        console.log(`Файл ${item} був очищений`);
                    });
                } else {
                    fs.rename(path.join(__dirname, dirname, item), path.join(__dirname, dirname, `_new-${item}`), (error) => {
                        if (error) {
                            console.log(error);
                            throw error;
                        }
                        console.log(`Папка ${item} буле перейменована`);
                    });
                }
            });
        }
    });
}

//checkDirectory('main');
//checkDirectory('main/first-folder');