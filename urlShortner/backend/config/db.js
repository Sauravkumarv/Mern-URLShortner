const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config();

const dbConnect=async()=>{
  try{
await mongoose.connect(process.env.MONGO_URL);
console.log("MongoDb Connected")
  }catch(err){
req.status(500).json({message:err})
  }

}

module.exports=dbConnect;