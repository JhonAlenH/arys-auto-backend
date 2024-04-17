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
const searchPlans = async (req, res) => {
  const ccompania = 1
  try {
    const plans = await Plan.searchPlans(ccompania);
    console.log(plans)
    if (plans.error) {
      return res.status(plans.code).send({
        status: false,
        message: plans.error
      });
    }
    res.status(201).send({
      status: true, 
      message: 'Planes Obtenidos',
      data: plans
    });
    
  } catch (error) {
    
  }
}

export default {
  createPlan,
  searchPlans
}