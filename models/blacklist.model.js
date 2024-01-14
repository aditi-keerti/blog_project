const mongoose=require('mongoose')

const blacklistSchema=mongoose.Schema({
    access_token:String,
    refresh_token:String,
})

const blacklistModel=mongoose.model('blacklist',blacklistSchema)

module.exports={blacklistModel}