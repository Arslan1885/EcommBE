import express from 'express'
import { uploadProductImage } from '../Utils/multer.js'
import { allProduct, createProduct, editProduct, singleProduct } from '../Controllers/productsController.js'

// import { authenticationRole } from '../Utils/authMW.js'


const productRoute = express.Router()

productRoute.post('/admin/product', uploadProductImage.single('image'), createProduct)
productRoute.get('/admin/allproducts', allProduct)
productRoute.get('/admin/singleproduct/:id', singleProduct)
productRoute.put('/admin/editproduct/:id', editProduct)


export default productRoute