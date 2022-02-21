const path = require('path');
const fs = require('fs');




fs.mkdir(path.join(__dirname,'main'),(error)=>{
    if(error){
        console.log(error);
        throw error;
    }


    fs.appendFile(path.join(__dirname,'main','f-file.txt'),'SOME DATA IN FILE',(error)=>{
        if (error){
            console.log(error);
            throw error;
        }

        fs.readFile(path.join(__dirname,'main','f-file.txt'),(error,dataFile)=>{
            if(error){
                console.log(error);
                throw error;
            }

            fs.mkdir(path.join(__dirname,'main','second-dir'),(error)=>{
                if(error){
                    console.log(error);
                    throw error;
                }

                fs.appendFile(path.join(__dirname,'main','second-dir','s-file.txt'),dataFile,(error)=>{
                    if(error){
                        console.log(error);
                        throw error;
                    }
                })

                fs.unlink(path.join(__dirname,'main','f-file.txt'),(error)=>{
                    if(error){
                        console.log(error);
                        throw error;
                    }
                    console.log('Finished!!')
                })
            })
        });

    })
})


