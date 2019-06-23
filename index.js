const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const path=require('path');

app.use(express.static('views'));

app.use('/api',require('./routes'));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'views','index.html'));
})




app.listen(5000,console.log("Node App running at 5000"));