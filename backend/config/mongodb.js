import mongoose from "mongoose";

const connectDB = async () =>{
    mongoose.connection.on('connected',()=>{
        console.log("Đã kết nối");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Shop-Fashion`)
}
export default connectDB;