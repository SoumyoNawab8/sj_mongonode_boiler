const express=require('express');
const MongoClient = require('mongodb').MongoClient;
const url=require('./config/keys').uri;
const router=express.Router();
const users=require('./controller/user');
const authStrategy=require('./config/authStrategy');
const collectionJSON=require('./models/collectionSchema.json');


const setupMongoDB=(db)=>new Promise((resolve,reject)=>{
    Object.keys(collectionJSON).map((key,indx)=>{
        db.createCollection(key, {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: collectionJSON[key].required, //[ "name", "year", "major", "address" ]
                    properties: collectionJSON[key].properties,

                }
            }
        }).then(status=>{
                if(indx==Object.keys(collectionJSON).length-1){
                    resolve(status);
                }
        })
    })
})

    const dbName = 'your_db_name';

// router.get('/')

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    // assert.equal(null, err);
    if(err){
        console.log(err);
    }
    else{


        const db = client.db(dbName);

            db.listCollections().toArray().then(resp=>{
                if(resp.length==0){
                    console.log('------------Setting up the db for you----------');
                    setupMongoDB(db).then(dbthemes=>{
                        console.log('Db setup is completed!');
                    }).catch(err=>{
                        console.log('Error while setting up db '+err);
                    })
                }
                else{
                    console.log("Connected successfully to server");
                }
            })

        router.post('/register',(req,res)=>users.register(req,res,db,client));
        router.post('/login',(req,res)=>users.login(req,res,db));
        // router.get('/user/:id',(req,res,next)=>authStrategy(req,res,db,next),(req,res)=>users.profile(req,res,db));

    //  client.close();
      
    }
   
  });

module.exports=router;