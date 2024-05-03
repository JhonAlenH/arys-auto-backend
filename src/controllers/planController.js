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
    const linkedServicios = await Servicio.linkServicios(data.cservicio, newPlan.result.recordset[0].cplan);
    if (linkedServicios.error) {
      return res.status(linkedServicios.code).send({
        status: false,
        message: linkedServicios.error
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
const searchPlanInfo = async (req, res) => {
  try {
    const plan = await Plan.searchPlanInfo(req.params.id);
    if (plan.error) {
      return res.status(plan.code).send({
        status: false,
        message: plan.error
      });
    }
    const planServices = await Servicio.searchPlanServices(plan.result.id);
    console.log(planServices)
    if (planServices.error) {
      return res.status(planServices.code).send({
        status: false,
        message: planServices.error
      });
    }
    plan.result.ctiposervicio = planServices
    res.status(201).send({
      status: true, 
      message: 'Informacion del Plan Obtenida',
      data: plan
    });
    
  } catch (error) {
    
  }
}
const searchPlans = async (req, res) => {
  const ccompania = 1
  try {
    const plans = await Plan.searchPlans(ccompania);
    // console.log(plans)
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
  searchPlans,
  searchPlanInfo
}