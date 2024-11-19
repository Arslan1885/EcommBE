import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})
const contact = mongoose.model('contacts', contactSchema)
export default contact