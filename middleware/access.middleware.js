const access=(permitRole)=>{
    return (req,res,next)=>{
        if(permitRole.includes(req.role)){
            next()
        }else{
            res.json({msg:"You are not authorized"})
        }
    }
}
module.exports={access}