//recieve files for db from postman , to that we create route

const router = require('express').Router()
const multer =require('multer') //for upload file handling 
const path = require('path')
const File = require('../models/file')
const {v7 : uuid7} = require('uuid') //recent version

//basic config for multer
let storage =multer.diskStorage({
    destination : (req, file, cb)=> cb(null, 'uploads/'),
    filename :(req, file, cb) =>{
        //i.e photo filename- 12042021-12345777.jpg/zip/png ... 
        const uniqueName= `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)} `
        cb(null, uniqueName)
    }
})

//more config for multer
let upload =multer({
    storage: storage,
    limit:{fileSize: 1000000 * 100}, //upto 1MB
}).single('myfile')






//route method
router.post('/', (req, res) => {
  


    //store files- in uploads folder
    upload(req, res, async (err)=>{
          //validate request
    if(!req.file){
        return res.json({
            error : 'All field are required.'
        })
    }
     //store files- in uploads folder
        if (err){
            return res.status(500).send({error :err.message})
        
    }
    //upload file to store to database
    //for store - we need first create models folder -file.js- schema and all

    const file = new File({
        filename : req.file.filname,
        
        //generate uuid-need package
        uuid : uuid7(),
        path : req.file.path,
        size: req.file.size

    })
    //need to save the file
    const response = await file.save()
    return respone.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`})
    //example : http://localhost:3000/files/1242345wq5-132424- download link
})

     //response - >link generate to download the file
})

router.post('/send' ,  async (req, res)=>{
         //receive
    const { uuid , emailTo, emailFrom } = req.body

    //validate request
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send( { error: 'All fields are required.' })

    }
     //get data from database

     const file = await File.findOne({ uuid : uuid})
     if (file.sender){
        return res.status(422).send( { error: 'Email Already Send.' })
     }

     file.sender = emailFrom
     file.receiver = emailTo

     const response = await file.save()


     //send email
     //get receive from emailSend function
    const sendEmail = require('../services/emailServices')
    //now call the function- custom function
    sendEmail({
        from :emailFrom,
        to :emailTo,
        subject: 'inShare file Sharing',
        text : `${emailFrom} shared a file with you.`,
        html : require('../services/emailTemplate') ({
            //send data to emailtemplate
            emailFrom  :emailFrom,
            downloadLink : `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + 'KB',
            expires: '24 hours'
        })

    })
    return res.send({ success: true})
})


module.exports =router