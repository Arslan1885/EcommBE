import userData from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userRegister = async (req, res) => {
    const { name, email, number, password } = req.body;
    try {
        if (!name || !email || !number || !password) {
            return res.status(400).json({ Message: "Please fill all the fields" })
        }

        const userExist = await userData.findOne({ email })
        if (userExist) {
            return res.status(400).json({ Message: "User already exist...!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const data = new userData({ name, email, number, password: hashedPassword })
        const result = await data.save()
        if (result) {
            return res.status(200).json({ Message: "Registration Successfull" })

        }
        else {
            return res.status(400).json({ Message: "Registration Failed" })

        }
    } catch (error) {
        console.log(`Error : ${error}`)

    }

}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ Message: "Please fill all the fields" })
        }

        const userExist = await userData.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ Message: "Please Register your Self" })
        }


        const comparePassword = await bcrypt.compare(password, userExist.password)



        if (comparePassword) {
            const token = jwt.sign({ userId: userExist._id, userRole: userExist.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
            return res.status(200).json(
                { 
                    Message: "Login Successfull", 
                    jwt_token: token,
                    userId: userExist._id,  
                    userRole: userExist.role
                }
            )

        }
        else {
            return res.status(409).json({ Message: "Login Failed" })

        }
    } catch (error) {
        console.log(`Error : ${error}`)

    }

}