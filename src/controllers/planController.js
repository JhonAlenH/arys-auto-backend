import Plan from '../db/Plan.js';
import Servicio from '../db/Servicio.js';

const createPlan = async (req, res) => {
  try {
    const newPlan = await Plan.createPlan();
    console.log(newPlan)
    if (newPlan.error) {
      return res.status(newPlan.code).send({
        status: false,
        message: newPlan.error
      });
    }
    const linkServicios = await Servicio.linkServicios()
    res.status(201).send({
      status: true, 
      message: 'Plan Creado',
      data: [...newPlan]
    });
    
  } catch (error) {
    
  }
}

export default {
  createPlan,
}