const router =  require('express').Router
const File = require('../models/file')


     
//:uuid -dynamic parameter- differ for every person
router.get('/:uuid', async (req, res) =>{

    try {
        //using uuid , fetch data from database
        const  file = await File.findOne({
            //using uuid , fetch condition, from params- we receive all objects from url
            uuid : req.params.uuid 
        })
        //if file is not available
        if ( !file){
            return res.render('download', {//render - html file
                error: 'Link has been expired.'
            }) 

        }
        //if file is available - show in frontend
        return res.render('download', {
            uuid: file.uuid,
            fileName : file.filename,
            fileSize : file.size,
            downloadLink : `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            //http://localhost:3000/files/downloads/12324w5w5-1234525      
        })


    }catch(err){
        return res.render('download', {//render - html file
            error: 'Something went wrong.'

        }) 
    }
    
    
})


module.exports = router