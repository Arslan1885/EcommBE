import express from 'express'
import { allOrder, createOrder, deletOrder } from '../Controllers/orderController.js'

const orderRoute = express.Router()

orderRoute.post('/order/create', createOrder)
orderRoute.get('/order/allorder', allOrder)
orderRoute.delete('/order/deleteorder/:id', deletOrder)

export default orderRoute