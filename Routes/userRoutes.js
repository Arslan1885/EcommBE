import express from 'express'
import { userLogin, userRegister } from '../Controllers/userController.js'

const userRoute = express.Router()

userRoute.post('/user/register' , userRegister)
userRoute.post('/user/login' , userLogin)

export default userRoute