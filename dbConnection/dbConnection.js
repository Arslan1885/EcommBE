import mongoose from "mongoose";

const dbConnection = async()=>{
    const connect = process.env.DB_URL
    try {
        await mongoose.connect(connect)
        console.log("Database is connected Successfully");
        
    } catch (error) {
        console.log(`Error : ${error}`);
        
    }

}
export default dbConnection;