require('dotenv').config();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, 
      pass: process.env.MAIL_PASSWORD 
    }
   });
const sendMail=(data)=>new Promise((resolve,reject)=>{
  console.log(data)
    const mailOptions = {
        from: 'admin@letzgetwed.com', // sender address
        to: data.email, // list of receivers
        subject: data.subject, // Subject line
        html: data.message// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
 
        if(err){
          console.log(err);
          reject(err);}
        else{
        resolve(info)}
     });
})
module.exports=sendMail;