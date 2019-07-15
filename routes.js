const express=require('express');
const MongoClient = require('mongodb').MongoClient;
const url=require('./config/keys').uri;
const router=express.Router();
const users=require('./controller/user');
const authStrategy=require('./config/authStrategy');

const dbName = 'pallighting';

// router.get('/')

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    // assert.equal(null, err);
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected successfully to server");
   
        const db = client.db(dbName);

        router.post('/UserRegistration',(req,res)=>users.register(req,res,db,client));
        router.post('/User_Register_Otp',(req,res)=>users.register_otp(req,res,db,client));
        router.post('/UserLogin',(req,res)=>users.login(req,res,db));
        router.get('/user/:id',(req,res,next)=>authStrategy(req,res,db,next),(req,res)=>users.profile(req,res,db));
    
    //  client.close();
      
    }
   
  });

module.exports=router;
