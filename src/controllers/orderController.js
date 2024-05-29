import Order from '../db/Order.js';
import Contracts from '../db/Contracts.js';
import userService from '../service/userService.js';

const getOrdersByUser = async (req, res) => {
  try {
    const user = await userService.getUserInfo(req.params.cusuario);
    if (user.error) { 
      res.status(user.code).send({ 
        status: false,
        message: user.error
      });
      return;
    }
    // console.log(user.subscription);
    const contractsMapped = user.subscription.map( contract => {return contract.ccontratoflota})
    console.log(contractsMapped);
    const orders = await Order.getOrdersByUser(contractsMapped);
    if (orders.error) {
      return res.status(orders.code).send({
        status: false,
        message: orders.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ordenes del Usuario Obtenidas',
      data: orders
    });
    
  } catch (error) {
    
  }
}
const getOrders = async (req, res) => {
  try {
    const orders = await Order.getOrders();
    if (orders.error) {
      return res.status(orders.code).send({
        status: false,
        message: orders.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Ordenes del Usuario Obtenidas',
      data: orders
    });
    
  } catch (error) {
    
  }
}
const getDetailedOrder = async (req, res) => {
  try {
    const order = await Order.getDetailedOrder(req.params.id);
    // console.log(order)
    if (order.error) {
      return res.status(order.code).send({
        status: false,
        message: order.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Informacion de la Orden Obtenida',
      data: order
    });
    
  } catch (error) {
    
  }
}

export default {
  getOrders,
  getDetailedOrder,
  getOrdersByUser
}