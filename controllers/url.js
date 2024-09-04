const shortid = require("shortid");
const URL = require('../models/url');


const handleGenerateNewShortURL = async (req, res) => {
    const body = req.body;
    console.log("Request Body:", req.body);

    // Generate a unique short ID
    const shortId = shortid(14);

    // Check if the URL is provided in the request body
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    // Create a new URL entry in the database
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    // Return the generated short ID
    return res.render("home",
        { id: shortId});
};

async function handleGetAnalytics(req,res) {
    const shortId= req.params.shortId;
    const result=await URL.findOne({shortId})
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory})
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};




