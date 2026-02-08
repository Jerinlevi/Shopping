const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB server is connected")

    }catch(error){
        console.error(`Server Error: ${error}`)
        process.exit(1)
    }
}
module.exports=connectDb