const router = require('express').Router()

const File = require('../models/file')


router.get('/:uuid' , (req, res) =>{
    //checking file exist or not - /12324w5w5-1234525  - req.params.uuid == uuid
    const file = await File.findOne({ uuid : req.params.uuid})

    if(!file){
        return res.render('download', {
            error : 'Link has been expired.'
        })
    }
    //we need to download the file
    //need to provide the download path
    const filePath = `${__dirname}/../${file.path}`

    res.download(filePath)


})

module.exports = router