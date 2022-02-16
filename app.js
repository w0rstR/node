const path = require('path')
const fs = require('fs')

const onlineUsers=[
    {name: "Maks", age: 22, city: "Lviv" },
]

const inPersonUsers =[
    {name: "Oleg", age: 19, city: "Kiev" },
]

function append(dirName, fileName, data){
    const ap = data.map(item=>{
        for(let key in item){
            fs.appendFile(path.join(__dirname,'main',dirName,fileName),`${key.toUpperCase()}:${item[key]}\n`,(err)=>{
                if(err){
                    console.log(err)
                }
            })
        }
    })
}
append('inPerson','inPerson.txt',onlineUsers)
append('online','online.txt',inPersonUsers)
