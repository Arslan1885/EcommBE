import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    productDetail: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    paymentMethod:{
        type:String,
        enum:['CARD','COD'],
        default:'COD',
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }
}, { timestamps: true })

const order = mongoose.model('orders', orderSchema)
export default order