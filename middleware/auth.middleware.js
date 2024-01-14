const jwt=require('jsonwebtoken')
const {blacklistModel}=require('../models/blacklist.model')
const {UserModel}=require('../models/user.model')

const auth=async(req,res,next)=>{
    const token =res.headers.authorization?.split(" ")[1]
    const blacklisted_token=await blacklistModel.findOne({access_token:token})
    if(token){
        if(blacklisted_token){
            return res.json({msg:"You have been logged out"})
        }
        try{
            const decode=jwt.verify(token,"masai");
            const {userID}=decode
            const user =await UserModel.findOne({_id:userID})
            const role=user?.role
            req.role=role
            next()
        }catch(err){
            res.json({error:err})
        }
    }
}

module.exports={
    auth
}