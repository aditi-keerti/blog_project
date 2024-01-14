const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:{
        type : String,
        require : true
    },
    genre:{
        type : String,
        require : true
    },
    writer:{
        type : String,
        require : true
    },
})

const BlogModel=mongoose.model('blog',blogSchema)

module.exports={
    BlogModel
}