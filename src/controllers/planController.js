import Plan from '../db/Plan.js';
import Servicio from '../db/Servicio.js';

const createPlan = async (req, res) => {
  const data = req.body
  try {
    const newPlan = await Plan.createPlan(data);
    if (newPlan.error) {
      return res.status(newPlan.code).send({
        status: false,
        message: newPlan.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Plan Creado',
      data: newPlan
    });
    
  } catch (error) {
    
  }
}

export default {
  createPlan,
}