const bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
const ObjectId=require('mongodb').ObjectID;


exports.register=(req,res,db)=>{
    let data=req.body;

    db.collection('users').findOne({email:data.email,phone:data.phone}).then(user=>{
        if(user==null){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(data.password, salt);
            data.password=hash;
            db.collection('users').insertOne(data).then(newUser=>{
                res.send({status:true,message:'User Registered'});
            }).catch(err=>{res.send({status:false,message:err})})
        }
        else{
            res.send({status:false,message:"User already Exist"});
        }
    })
}

exports.login=(req,res,db)=>{
    let data=req.body;

    db.collection('users').findOne({email:data.email}).then(user=>{
        if(user!=null){
            if(bcrypt.compareSync(data.password, user.password)){
                res.send({status:true,user,token:jwt.sign(user, 'pall')});
            }
            else{
                res.send({status:false,message:'Invalid password'})
            }
            
        }
        else{
            res.send({status:false,message:"No user found."})
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