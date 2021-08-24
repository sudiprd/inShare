const nodemailer = require('nodemailer')

async function sendEmail({ from , to ,subject, text, html }){
       
    let transporter = nodemailer.createTransport({
         //smtp setup
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure : false,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS,
        }

    })
    //sending mail- this is nodemailer method for sending email- need to pass the internal method function
    let info = await transporter.sendEmail({
        from :  `inShare <${from}>`, 
        to, // in js if key-value are same, then single word can write
        subject,
        text,
        html, 
    })
    console.log(info)
}

module.exports = sendEmail()