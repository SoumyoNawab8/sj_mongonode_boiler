require('dotenv').config();
const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET });
const s3 = new AWS.S3();
exports.uploadFile = (type, file, pathWithFile) => new Promise(resolve => {
    var base64Str = file;
    const base64Data = new Buffer.from(base64Str, 'base64');
    const params = {
        Bucket: process.env.BUCKETNAME,
        Key: pathWithFile,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `${type}`
    }
    s3.upload(params, (err, datas) => {
        if (err) { return console.log(err) }
        console.log('Image successfully uploaded.');
        resolve(datas)
    });
})
