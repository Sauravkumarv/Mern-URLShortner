  const mongoose=require('mongoose')
  const dotenv=require('dotenv')

  dotenv.config();

  const dbConnect=async()=>{
    try{
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDb Connected")
    }catch(err){
      console.error('MongoDB connection failed:', err);
      process.exit(1); // Server ko band kar do, taki error kaam na kare
    }

  }

  module.exports=dbConnect;