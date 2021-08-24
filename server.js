const express = require ('express')
const app = require()
const http = require('http').createServer(app)
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors')


const PORT = process.env.PORT || 3000
//for implementing the css file or ejs files
app.use(express.static('public'))
//while sending data from Postman -it send JSon file , while in express server, would not recieve json data,
// to get the json file also, we need to pass as json data too
app.use(express.json())

const connectDB =require('./config/db')
connectDB()


//Cors set up
//set options for cors
const corsOption ={
    origin : process.env.ALLOWED_CLIENTS.split(',')

}
//cors- middleware define
app.use(cors(corsOption))


// set the template engines- download.ejs

app.use(expressLayouts)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


//route -if server.js get the request , then transfer to files.js
app.use('/api/files', require('./routes/files'))
//for download page link
app.use('/file', require('./routes/show'))
//download link endpoint
app.use('./files/download', require('./routes/download'))


http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

app.get('/', (req,res) =>{
    res.send('hello world from the server')
})
