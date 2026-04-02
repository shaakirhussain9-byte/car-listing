import mongoose, { Mongoose } from "mongoose";
const connectDB =  async()=>
    await mongoose.connect(
        process.env.MongoDB_URI
    )

    .then(()=>{
    })
    .catch(() =>{
        console.log(err)
    })
    export default connectDB