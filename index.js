const express = require("express");
const urlRoute = require('./routes/url');
const URL=require('./models/url')
const { connectToMongodb } = require('./connect');
const app = express();
const PORT = 8001;

// Middleware to parse JSON bodies (only needs to be included once)
app.use(express.json());

connectToMongodb('mongodb://127.0.0.1:27017/shorturl').then(() => console.log("MongoDB Connected"));

app.use("/url", urlRoute);
app.get("/:shortId", async(req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    },

{$push:{
    visitHistory:{timestamp:Date.now()}}
})
res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));

