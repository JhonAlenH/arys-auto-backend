import Moneda from '../db/Moneda.js';

const createMoneda = async (req, res) => {
  try {
    const createdMoneda = await Moneda.createMoneda(req.body);
    if (createdMoneda.error) {
      return res.status(createdMoneda.code).send({
        status: false,
        message: createdMoneda.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Moneda Creada',
      data: createdMoneda
    });
    
  } catch (error) {
    
  }
}

export default {
  createMoneda
}