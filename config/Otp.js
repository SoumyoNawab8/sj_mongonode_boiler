require('dotenv').config();
const fetch = require('node-fetch');
const otpSend = (phone, otp) => new Promise((resolve, reject) => {
    // var val = Math.floor(1000 + Math.random() * 9000);
    var val = otp;
    var http = require('http');
    var urlencode = require('urlencode');
    var msg = urlencode(`The verification code is ${val}`);
    var number = phone;
    var username = process.env.OTP_EMAIL;
    var hash = process.env.OTP_HASH;
    var sender = process.env.OTP_SENDER;
    var data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + number + '&message=' + msg
    var options = {
        host: 'api.textlocal.in/send?' + data,
        path: '/send?' + data
    };
    fetch('https://api.textlocal.in/send?' + data).then(response => response.json())
        .then(json => {
            resolve(true);
            console.log("SMS Sent")
        }).catch(err => {
            console.log(err)
            reject(err);
        })
});
module.export = otpSend;