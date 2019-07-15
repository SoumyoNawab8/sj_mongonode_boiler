const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
const ObjectId=require('mongodb').ObjectID;


exports.register=(req,res,db,client)=>{
    let data=req.body;
    console.log(data);

    db.collection('users').findOne({Email_Id:data.Email_Id, Mobile_No:data.Mobile_No}).then(user=>{
        if(user==null){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data.Password, salt);
            data.Password=hash;
            db.collection('users').insertOne(data).then(newUser=>{
                res.send({Status:1,msg:'Registration Successfull',_msid:newUser.insertedId});
                //client.close();
            }).catch(err=>{res.send({Status:0,msg:'Error Occured'})})
        }
        else{
            res.send({Status:0,msg:"Already Registered"});
            // client.close();
        }
    })
}

exports.register_otp=(req,res,db,client)=>{
    let data=req.body;
    console.log(data);

    db.collection('users').findOne({Email_Id:data.Email_Id, Mobile_No:data.Mobile_No}).then(user=>{
        if(user==null){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data.Password, salt);
            data.Password=hash;
            db.collection('users').insertOne(data).then(newUser=>{
                res.send({Status:1,msg:'Registration Successfull',_msid:newUser.insertedId});
                //client.close();
            }).catch(err=>{res.send({Status:0,msg:'Error Occured'})})
        }
        else{
            res.send({Status:0,msg:"Already Registered"});
            // client.close();
        }
    })
}

exports.login=(req,res,db)=>{
    let data=req.body;

    db.collection('users').findOne({Mobile_No:data.Mobile_No}).then(user=>{
        if(user!=null){
            if(bcrypt.compareSync(data.Password, user.Password)){
                res.send({Status:1 ,details:Object.assign({},user,{_msid:user._id}),ProjectDetails:{ProjectId:'32323',ProjectName:'Whatever',Location:'Kol',ProjCreatedDate:'27/07/19',ProjLastDate:'27/07/19'}});
            }
            else{
                res.send({Status:0,message:'Invalid password'})
            }
            
        }
        else{
            res.send({Status:0,message:"Err code"})
        }
    })
}


exports.profile=(req,res,db)=>{
    let id=req.params.id;

    db.collection('users').findOne({_id:ObjectId(id)}).then(user=>{
        res.send({status:true,profile:user});
    }).catch(err=>{
        res.send({status:false,message:err})
    })
}