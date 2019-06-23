
exports.register=(req,res,db)=>{
    let data=req.body;

    db.collection('users').findOne({email:data.email,phone:data.phone}).then(user=>{
        if(user==null){

            db.collection('users').insertOne(data).then(newUser=>{
                res.send({status:true,message:'User Registered'});
            }).catch(err=>{res.send({status:false,message:err})})
        }
        else{
            res.send({status:false,message:"User already Exist"});
        }
    })
}