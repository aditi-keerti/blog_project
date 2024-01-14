const express=require('express')
const {BlogModel}=require('../models/blog.model')
//const jwt=require('jsonwebtoken')
const {auth}=require('../middleware/auth.middleware')
const {access}=require('../middleware/access.middleware')

const cors=require("cors")

const blogRoute=express.Router()
blogRoute.use(cors())
blogRoute.get('/',auth,access(["reader","admin"]),async(req,res)=>{
    try{
        const blog=await BlogModel.find(req.query)
        res.status(200).json({blog_data:blog})
    }catch(err){
        res.status(400).json({error:err})
    }
})
blogRoute.post('/add',auth,access(["admin","writer"]),async(req,res)=>{
    const payload=req.body
    try{
        const blog=new BlogModel(payload)
        await blog.save()
        res.status(200).json({msg:"The blog has been added"})
    }catch(err){
        res.status(400).json({error:err})
    }
})

blogRoute.patch("/update/:blogID",auth,access(["admin","writer"]),async(req,res)=>{
    const blogId=req.params.blogID
    try{
        await BlogModel.findByIdAndUpdate({_id:blogId})
        res.status(200).json({msg:"The blog is updated"})
    }catch(err){
        res.status(400).json({error:err})
    }
})

blogRoute.delete("/delete/:blogID",auth,access(["admin","writer"]),async(req,res)=>{
    const blogId=req.params.blogID
    try{
        await BlogModel.findByIdAndDelete({_id:blogId})
        res.status(200).json({msg:"The blog is deleted"})
    }catch(err){
        res.status(400).json({error:err})
    }
})

module.exports={
    blogRoute
}



