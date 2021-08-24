const File = require('./models/file')
const fs = require('fs')
const connectDB =require('./config/db')// need to acquire database for remove from database-
connectDB()// connect with database

async function fetchData() {
    //24hours old file fetch- then delete those files
        //time in miliseconds- convert into normal data- new Date
        const pastDate = new Date(Date.now() - 24*60*60*1000)

        const files = await File.find({
        //condition- createdAt uploade time
            createdAt : { $lt : pastDate}
    })
    if(file.length){
        //iterete through singles files
        for (const file of files){
           try {
                //delete from store - one by one
            fs.unlinkSync(file.path)
            //delete from database
            await file.remove()
            console.log(`Successfully deleted ${file.filename}`)


           }catch(err){
                console.log(`Error while deleting file  ${err}`)
           }
        }
        console.log('Job done!')
    }
}
// //function call - promise return
// fetchData().then(() =>{
//     //after completion this script, we need to stop the script
//     process.exit()  
// })
fetchData().then( process.exit())