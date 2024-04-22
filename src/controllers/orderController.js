import Order from '../db/Order.js';

const getOrders = async (req, res) => {
  try {
    const orders = await Order.getOrders();
    if (newPlan.error) {
      return res.status(newPlan.code).send({
        status: false,
        message: newPlan.error
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
}