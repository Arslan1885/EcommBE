import express from 'express'
import { allContact, createContact } from '../Controllers/contactController.js'

const contactRoute = express.Router()

contactRoute.post('/contact' , createContact)
contactRoute.get('/allcontact' , allContact)

export default contactRoute