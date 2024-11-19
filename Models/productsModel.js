import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {

        type: String,
        required: true
    }
    
});

const product = mongoose.model('products', productSchema);

export default product;
