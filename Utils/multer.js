import multer from 'multer';




// Storage for product images
const productStorage = multer.diskStorage({
    destination: './uploads/product',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});


export const uploadProductImage = multer({ storage: productStorage });
