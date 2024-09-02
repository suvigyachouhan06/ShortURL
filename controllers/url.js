const {nanoid}=require("nanoid")
const URl=require('../models/url')
async function handleGenerateNewShortURl(req,res){
    const body=req.body;
    const shortID=nanoid(8);
    if(!body) return res.status(400).json({error:"URL is required"})
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    })
    return res.json({id:shortID})
}

module.exports={
    handleGenerateNewShortURl
}