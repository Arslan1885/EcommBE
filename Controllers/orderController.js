import order from "../Models/orderModel.js"


export const createOrder = async (req, res) => {
    const { name, email, shippingAddress, productDetail, paymentMethod, totalPrice } = req.body
    try {
        if (!name || !email || !shippingAddress || !paymentMethod || !productDetail || !totalPrice) {
            return res.status(409).json({ Message: "All fields are required" })
        }

        const data = new order({ name, email, shippingAddress, productDetail, paymentMethod, totalPrice })

        const result = await data.save()
        if (result) {

            return res.status(200).json({ Message: "Your order is plased" })
        }
        else {

            return res.status(404).json({ Message: "Your order is Not plased" })
        }

    } catch (error) {
        console.log(`ERROR: ${error}`)

    }


}
export const allOrder = async (req, res) => {
    try {
        const data = await order.find();
        return res.status(200).send(data)
    }
    catch (error) {
        console.log(`ERROR: ${error}`)
    }
}

export const deletOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await order.findByIdAndDelete(id);
        return res.status(200).send({Message:"Order deleted Successfully"})
    }
    catch (error) {
        console.log(`ERROR: ${error}`)
    }
}