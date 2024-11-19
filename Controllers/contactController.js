import contact from "../Models/contactModel.js";


export const createContact = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        if (!name || !email || !message) {
            return res.status(400).json({ Message: "Please fill all fields" })

        }
        const newContact = new contact({ name, email, message })
        const result = await newContact.save()
        if (result) {
            return res.status(200).json({ Message: "Message Sent" })
        }
        else {
            return res.status(400).json({ Message: "Message Not Sent" })

        }


    } catch (error) {
        console.log(`Error ${error}`)

    }
}
export const allContact = async (req, res) => {

    const contacts = await contact.find()
    if (contacts) {
        return res.status(200).json(contacts)
    }


}