import express from 'express'
import { adminLogin, adminRegister, allUsersData, deleteUser, edit, user } from '../Controllers/adminController.js'
// import { authenticationRole } from '../Utils/authMW.js'


const adminRoute = express.Router()

adminRoute.post('/admin/register', adminRegister)
adminRoute.post('/admin/login', adminLogin)
adminRoute.get('/admin/alluser',allUsersData)
adminRoute.delete('/admin/delete/:id', deleteUser);
adminRoute.get('/admin/user/:id', user);
adminRoute.put('/admin/edit/:id', edit);

export default adminRoute