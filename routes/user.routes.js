const express=require("express")
const {UserModel}=require("../models/user.model")
const {blaclistModel}=require("../models/blacklist.model")
const bcrypt=require('bcrypt')
const jwt =require('jsonwebtoken')
const cookieParser=require("cookie-parser")


const userRoute=express.Router()
userRoute.use(cookieParser())

userRoute.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        if(!/[A-Z]/.test(pass) || !/\d/.test(pass)|| !/[!@#$%^&*()_+{};]/.test(pass)||pass.length<8){
           return res.status(400).json({msg:"Cannot register"})
        }
        const existing_user= await UserModel.findOne({email})
        if(existing_user){
            return res.status(400).json({msg:"Alreadt Registered, Please Login!!"})

        }
       bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.status(200).json(err)
        }else{
            const user=new UserModel({name,email,pass:hash})
            await user.save()
            res.status(200).json({msg:"New user Registered"})
        }
        
       })      
    }catch(err){
        res.status(400).json(err)
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,pass}=req.body
    const user=await UserModel.findOne({email})
    try{
    if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const access_token=jwt.sign({course:"nsd104"},"masai",{expiresIn:'1d'})
                const refresh_token=jwt.sign({course:"nsd"},"school",{expiresIn:'7d'})
                res.cookie('refresh_token',refresh_token,{httpOnly:true});
                res.cookie('access_token',access_token,{httpOnly:true});
                
                res.status(200).json({msg:"Login Successfull!!",access_token,refresh_token})
            }else{
                res.status(200).json({msg:"Wrong password,Try again!!",err})
            }
        })
    }else{
        res.status(200).json({msg:"No user Found.Please Register!!"})
    }
}catch(err){
    res.status(400).json(err)
}
})

userRoute.post('/logout',(req,res)=>{
   const access_token=req.header.authorization?.split(" ")[1]
   const refresh_token=req.header.authorization?.split(" ")[1]
   
   try{
    res.clearCookie('refresh_token')
    res.clearCookie('access_token')

    res.status(200).json({msg:"Logout sccessfull"})
   }catch(err){
    res.status(400).json({error:err})
   }

   
})



module.exports={
    userRoute
}