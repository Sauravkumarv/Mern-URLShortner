const URL = require("../model/url");
const { nanoid } = require("nanoid");

const handelGenerateNewShortUrl = async (req, res) => {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ message: "Url required" });
  }
  const shortid = nanoid(8);
  try {
    const newUrl = await URL.create({
      shortId: shortid,
      url: body.url,
      visitHistory: [],
    });
    console.log(newUrl);
    return res.status(201).json({
      message: "Short URL created successfully",
      shortId:shortid
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUrl = async (req, res) => {
  const getShortId = await URL.find();
  if(getShortId.length===0){
    return res.status(404).json({message:"Empty"})
  }
  return res.json({ urls:getShortId });
};

const getbyId = async (req, res,next) => {
  try{
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId},
    { $push: { visitHistory: { timestamp: Date.now() } } }
 )

  if (!entry) {
    return res.status(404).json({ message: "URL not found" });
  }

  return res.redirect(entry.url);
} catch (error) {
  next(error); // Pass to error handler middleware
}
}

const analytics=async(req,res)=>{
  const shortId=req.params.shortId;

  const result=await URL.findOne({shortId})
  return res.json({
    totalClicks: result.visitHistory.length,
  visitHistory: result.visitHistory,
  originalUrl: result.url,
  createdAt: result.createdAt,
  shortId: result.shortId
  })
}

module.exports = { handelGenerateNewShortUrl, getUrl, analytics,getbyId };
