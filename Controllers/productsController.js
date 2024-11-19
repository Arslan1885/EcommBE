import product from "../Models/productsModel.js"



//Create Category
export const createProduct = async (req, res) => {
    const { name, description, price } = req.body
    try {
        if (!name || !description || !price || !req.file) {
            return res.status(409).json({ Message: "Please fill all fields" })
        }
        
        const imageUrl = `http://localhost:8080/uploads/product/${req.file.filename}`;


        const data = new product({ name, description, price, image:imageUrl})
        const result = await data.save()
        if (result) {
            return res.status(200).json({ Message: "Category Successfully Created" })
        }
        else {
            return res.status(400).json({ Message: "Category not created" })
        }
    } catch (error) {
        console.log(`Error : ${error}`)

    }
}

//All categories
export const allProduct = async (req, res) => {
    try {

        const data = await product.find()
        return res.status(200).json(data)
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}

//sinle category
export const singleProduct = async (req, res) => {
    const { id } = req.params
    try {

        const data = await product.findById(id)
        return res.status(200).json(data)
    } catch (error) {
        console.log(`Error : ${error}`)
    }
}

//update category
export const editProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body
    try {
        const updatedData = {
            name,
            description,
            price,
            category,
            ...(req.file && { image: req.file.path }) // Only add image if it exists in the request
        };

        const data = await product.findByIdAndUpdate(id, updatedData, { new: true });
        if (data) {
            return res.status(200).json({ Message: "Category Updated Successfully" });
        } else {
            return res.status(404).json({ Message: "Category not found" });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ Message: "Server error" });
    }
};

