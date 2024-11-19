import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnection from "./dbConnection/dbConnection.js";
import userRoute from "./Routes/userRoutes.js";
import adminRoute from "./Routes/adminRoutes.js";
import productRoute from "./Routes/productRoutes.js";
import orderRoute from "./Routes/orderRoutes.js";
import contactRoute from "./Routes/contactRoutes.js";

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())


app.use('/uploads/product', express.static('uploads/product'));


app.use(userRoute)
app.use(adminRoute)

app.use(productRoute)
app.use(orderRoute)
app.use(contactRoute)



const port = process.env.PORT || 3000
app.listen(port,()=>{
    dbConnection()
    console.log(`server is connect at ${port}`);
})
