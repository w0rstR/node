const path = require('path');
const fs = require('fs');

// fs.mkdir(path.join(__dirname, 'main'), (error) => {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//
//     fs.appendFile(path.join(__dirname,'main','new-file.txt'),'SOME DATA IN FILE' , (error)=>{
//         if(error){
//             console.log(error);
//             throw error;
//         }
//
//         fs.readFile(path.join(__dirname,'main','new-file.txt'),(error,dataFile)=>{
//             if(error){
//                 console.log(error);
//                 throw error;
//             }
//
//             fs.appendFile(path.join(__dirname,'main','second-file.txt'),dataFile,(error)=>{
//                 if (error){
//                     console.log(error);
//                     throw error;
//                 }
//             });
//         });
//     });
//
// });

