import userData from "../Models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
//register Admin
export const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const chackRole = await userData.findOne({ role: 'admin' });
        if (chackRole) {
            return res.status(400).json({ Message: "An admin already exists. Only one admin allowed." });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ Message: "Please fill all the fields" })
        }

        const adminExist = await userData.findOne({ email })
        if (adminExist) {
            return res.status(400).json({ Message: "User already exist...!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const data = new userData({ name, email, password: hashedPassword, role: "admin" })
        const result = await data.save()
        if (result) {
            return res.status(200).json({ Message: "Registration Successfull" })

        }
        else {
            return res.status(409).json({ Message: "Registration Failed" })

        }
    } catch (error) {
        console.log(`Error : ${error}`)

    }

}
//login Admin

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ Message: "Please fill all the fields" })
        }

        const adminExist = await userData.findOne({ email })
        if (!adminExist) {
            return res.status(400).json({ Message: "Please Register your Self" })
        }


        const comparePassword = await bcrypt.compare(password, adminExist.password)



        if (comparePassword) {
            const token = jwt.sign({ userId: adminExist._id, userRole: adminExist.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
            return res.status(200).json({ Message: `welcome ${adminExist.role}`, jwt_token: token })

        }
        else {
            return res.status(409).json({ Message: "Login Failed" })

        }
    } catch (error) {
        console.log(`Error : ${error}`)

    }

}

//All user data

export const allUsersData = async (req, res) => {
    try {
        const data = await userData.find({ role: 'user' });

        res.status(200).send(data);

    } catch (error) {
        console.log(`Error : ${error}`);
    }
}

// Delete User
export const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userData.findByIdAndDelete(id);
        if (user) {
            return res.status(200).json({ Message: "User deleted Successfully" })

        }
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}

//get single User
export const user = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await userData.findById(id);

        res.status(200).send(data);

    } catch (error) {
        console.log(`Error : ${error}`);
    }
}

//update User

export const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body
        const hash = await bcrypt.hash(password, 10)
        const user = await userData.findByIdAndUpdate(id, { name, email, password: hash }, { new: true })
        if (user) {

            return res.status(200).json({ Message: "Details Updated Successfully" })
        }
        else {
            return res.status(400).json({ Message: "Details Updated Successfully" })

        }



    } catch (error) {
        console.log(`Error:${error}`)

    }
}


