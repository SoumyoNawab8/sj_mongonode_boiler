const jwt=require('jsonwebtoken');
const ObjectId=require('mongodb').ObjectID;
module.exports=(req,res,db,next)=>{
    let token=req.headers.authorization;
    token=token.split(" ")[1];
    jwt.verify(token,'lgw', function(err, decoded) {
        if(err){
            console.log(err)
            res.status(401).send({message:"Unauthorized Request"});
        }
        else{
            console.log('User Authorised')
            db.collection('users').findOne({_id:ObjectId(decoded._id)}).then(user=>{
                req.user=user;
                next();
            }).catch(err=>{
               res.send({status:'0',msg:'Network error'});
            })       
        }
      });
}


