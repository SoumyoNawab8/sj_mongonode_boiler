const express=require('express');
const MongoClient = require('mongodb').MongoClient;
const url=require('./config/keys').uri;
const router=express.Router();
const users=require('./controller/user');

const dbName = 'proj1';

// router.get('/')

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    // assert.equal(null, err);
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected successfully to server");
   
        const db = client.db(dbName);
    //    console.log(db)
        router.post('/register',(req,res)=>users.register(req,res,db));
    
     client.close();
      
    }
   
  });

module.exports=router;