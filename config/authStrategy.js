const jwt=require('jsonwebtoken');

module.exports=(req,res,db,next)=>{
    let token=req.headers.authorization;
    token=token.split(" ")[1];

    jwt.verify(token,'proj', function(err, decoded) {
        if(err){
           res.status(401).send({message:"Unauthorized Request"});
        }
        else{
            console.log('User Auhorized') // bar
            next();
        }
        

      });
}