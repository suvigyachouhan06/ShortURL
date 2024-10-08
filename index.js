const express = require("express");
const urlRoute = require('./routes/url');
const URL=require('./models/url')
const staticRoute=require('./routes/staticRouter')
const path = require("path");
const { connectToMongodb } = require('./connect');
const app = express();
const PORT = 8001;

app.set("view engine","ejs");
app.set("views", path.resolve("./views"))
// Middleware to parse JSON bodies (only needs to be included once)
app.use(express.json());
app.use(express.urlencoded({extended:false}))

connectToMongodb('mongodb://127.0.0.1:27017/shorturl').then(() => console.log("MongoDB Connected"));

app.get("/test", async (req,res)=>{
    const allUrls=await URL.find({});
   return res.render('home',{
    urls:allUrls
   })
 
})

app.use("/url", urlRoute);
app.use('/',staticRoute)  //ejs view

app.get("/url/:shortId", async(req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    },
    {$push:{
        visitHistory:{timestamp:Date.now()}}
    }
    
)
res.redirect(entry?.redirectURL)
})


app.listen(PORT, () => console.log(`Server Started at ${PORT}`));

